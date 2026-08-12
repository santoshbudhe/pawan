/**************************************************************************************************
 *
 * uploadAssets.ts
 *
 * Generic Firebase Storage + Firestore Asset Uploader
 *
 * Features
 * --------
 * ✓ Recursive folder scanning
 * ✓ Preserves folder hierarchy
 * ✓ Automatic MIME detection
 * ✓ Parallel uploads
 * ✓ Retry failed uploads
 * ✓ SHA-256 hashing
 * ✓ Skip unchanged assets
 * ✓ Bulk Firestore writes
 * ✓ Optional dry-run mode
 * ✓ Optional orphan cleanup
 * ✓ Progress reporting
 * ✓ Upload statistics
 *
 * Usage
 * -----
 *
 * tsx uploadAssets.ts \
 *   --credentials ./config/serviceAccount.json \
 *   --assets ./assets \
 *   --collection assets \
 *   --bucket my-project.firebasestorage.app \
 *   --concurrency 8 \
 *   --retry 3 \
 *   --dry-run
 *
 **************************************************************************************************/

/**************************************************************************************************
 * SECTION 02
 * IMPORTS
 **************************************************************************************************/

import fs from "fs";
import path from "path";
import process from "process";
import crypto from "crypto";

import fg from "fast-glob";
import mime from "mime";

import { initializeApp, cert } from "firebase-admin/app";
import { getStorage, Storage } from "firebase-admin/storage";
import {
    getFirestore,
    Firestore,
    BulkWriter,
    Timestamp,
    DocumentData
} from "firebase-admin/firestore";

import {
    getStorage,
    Storage
} from "firebase-admin/storage";

import {
    getFirestore,
    Firestore,
    BulkWriter,
    Timestamp,
    DocumentData
} from "firebase-admin/firestore";

/**************************************************************************************************
 * SECTION 03
 * DEFAULT CONSTANTS
 **************************************************************************************************/

const DEFAULT_COLLECTION = "assets";

const DEFAULT_CONCURRENCY = 8;

const DEFAULT_RETRY_COUNT = 3;

const DEFAULT_CACHE_CONTROL =
    "public,max-age=31536000,immutable";

const DEFAULT_ASSETS_FOLDER =
    "./assets";

const DEFAULT_CREDENTIALS =
    "./credentials/serviceAccountKey.json";

/**************************************************************************************************
 * SECTION 04
 * TYPES
 **************************************************************************************************/

interface Config {

    credentials: string;

    assetsFolder: string;

    bucket?: string;

    collection: string;

    concurrency: number;

    retryCount: number;

    dryRun: boolean;

    deleteOrphans: boolean;

}

interface AssetFile {

    absolutePath: string;

    relativePath: string;

    category: string;

    filename: string;

    extension: string;

    mimeType: string;

    size: number;

    hash: string;

}

interface UploadResult {

    asset: AssetFile;

    uploaded: boolean;

    skipped: boolean;

    updated: boolean;

    failed: boolean;

    error?: unknown;

}

interface FirestoreAsset {

    category: string;

    filename: string;

    storagePath: string;

    extension: string;

    contentType: string;

    size: number;

    hash: string;

    updatedAt: Timestamp;

}

interface Summary {

    total: number;

    uploaded: number;

    updated: number;

    skipped: number;

    failed: number;

    deleted: number;

    bytesUploaded: number;

    startedAt: number;

    finishedAt: number;

}

/**************************************************************************************************
 * SECTION 05
 * CLI ARGUMENT PARSER
 **************************************************************************************************/

function getArgument(
    name: string
): string | undefined {

    const index =
        process.argv.indexOf(`--${name}`);

    if (index === -1) {

        return undefined;

    }

    return process.argv[index + 1];

}

const config: Config = {

    credentials:

        getArgument("credentials") ??

        process.env.FIREBASE_CREDENTIALS ??

        DEFAULT_CREDENTIALS,

    assetsFolder:

        getArgument("assets") ??

        process.env.ASSETS_PATH ??

        DEFAULT_ASSETS_FOLDER,

    bucket:

        getArgument("bucket") ??

        process.env.FIREBASE_STORAGE_BUCKET,

    collection:

        getArgument("collection") ??

        DEFAULT_COLLECTION,

    concurrency:

        Number(

            getArgument("concurrency") ??

            DEFAULT_CONCURRENCY

        ),

    retryCount:

        Number(

            getArgument("retry") ??

            DEFAULT_RETRY_COUNT

        ),

    dryRun:

        process.argv.includes("--dry-run"),

    deleteOrphans:

        process.argv.includes("--delete-orphans")

};

/**************************************************************************************************
 * SECTION 06
 * LOGGER
 **************************************************************************************************/

const log = {

    info(message: string) {

        console.log(message);

    },

    success(message: string) {

        console.log(`✓ ${message}`);

    },

    warning(message: string) {

        console.warn(`⚠ ${message}`);

    },

    error(message: string) {

        console.error(`✖ ${message}`);

    },

    progress(
        current: number,
        total: number,
        file: string
    ) {

        process.stdout.write(

            `[${current}/${total}] ${file} ... `

        );

    }

};

/**************************************************************************************************
 * SECTION 07
 * VALIDATION
 **************************************************************************************************/

function validateConfiguration() {

    if (!fs.existsSync(config.credentials)) {

        throw new Error(

            `Credentials file not found:\n${config.credentials}`

        );

    }

    if (!fs.existsSync(config.assetsFolder)) {

        throw new Error(

            `Assets folder not found:\n${config.assetsFolder}`

        );

    }

}

/**************************************************************************************************
 * SECTION 08
 * FIREBASE INITIALIZATION
 **************************************************************************************************/

validateConfiguration();

const serviceAccount = JSON.parse(

    fs.readFileSync(

        config.credentials,

        "utf8"

    )

);

initializeApp({

    credential: cert(serviceAccount),

    storageBucket:
        config.bucket ??
        `${serviceAccount.project_id}.firebasestorage.app`

});


const db: Firestore =
    getFirestore(undefined,"pawan");

const storage: Storage =
    getStorage();

const bucket =
    storage.bucket();

const writer: BulkWriter =
    db.bulkWriter();

/**************************************************************************************************
 * SECTION 09
 * HELPERS
 **************************************************************************************************/

function normalizePath(
    file: string
): string {

    return file.replace(/\\/g, "/");

}

function buildStoragePath(
    asset: AssetFile
): string {

    return normalizePath(

        asset.relativePath

    );

}

function buildDocumentId(
    asset: AssetFile
): string {

    const filename =

        asset.filename.replace(

            /\.[^/.]+$/,

            ""

        );

    return `${asset.category}_${filename}`;

}

function mimeType(
    file: string
): string {

    return (

        mime.getType(file)

        ??

        "application/octet-stream"

    );

}

/**************************************************************************************************
 * SECTION 10
 * SHA-256 HASHING
 **************************************************************************************************/

function sha256(

    file: string

): string {

    const hash =

        crypto.createHash(

            "sha256"

        );

    hash.update(

        fs.readFileSync(file)

    );

    return hash.digest("hex");

}
/**************************************************************************************************
 * SECTION 11
 * RECURSIVE ASSET SCANNER
 **************************************************************************************************/

async function discoverAssets(): Promise<AssetFile[]> {

    const files = await fg("**/*", {
        cwd: config.assetsFolder,
        onlyFiles: true,
        dot: false,
        absolute: true
    });

    const assets: AssetFile[] = [];

    for (const absolutePath of files) {

        const relativePath = normalizePath(
            path.relative(config.assetsFolder, absolutePath)
        );

        const stat = fs.statSync(absolutePath);

        const parsed = path.parse(relativePath);

        const parts = relativePath.split("/");

        assets.push({

            absolutePath,

            relativePath,

            category: parts.length > 1
                ? parts[0]
                : "root",

            filename: parsed.base,

            extension: parsed.ext.replace(".", "").toLowerCase(),

            mimeType: mimeType(absolutePath),

            size: stat.size,

            hash: sha256(absolutePath)

        });

    }

    assets.sort((a, b) =>
        a.relativePath.localeCompare(b.relativePath)
    );

    return assets;

}

/**************************************************************************************************
 * SECTION 12
 * LOAD EXISTING FIRESTORE METADATA
 **************************************************************************************************/

async function loadExistingAssets():

Promise<Map<string, FirestoreAsset>> {

    const snapshot =
        await db.collection(config.collection).get();

    const map = new Map<string, FirestoreAsset>();

    snapshot.forEach(doc => {

        map.set(

            doc.id,

            doc.data() as FirestoreAsset

        );

    });

    return map;

}

/**************************************************************************************************
 * SECTION 13
 * COMPARE ASSETS
 **************************************************************************************************/

interface ComparisonResult {

    upload: AssetFile[];

    skip: AssetFile[];

    update: AssetFile[];

}

function compareAssets(

    localAssets: AssetFile[],

    existingAssets: Map<string, FirestoreAsset>

): ComparisonResult {

    const upload: AssetFile[] = [];

    const skip: AssetFile[] = [];

    const update: AssetFile[] = [];

    for (const asset of localAssets) {

        const id =
            buildDocumentId(asset);

        const existing =
            existingAssets.get(id);

        if (!existing) {

            upload.push(asset);

            continue;

        }

        if (existing.hash === asset.hash) {

            skip.push(asset);

            continue;

        }

        update.push(asset);

    }

    return {

        upload,

        skip,

        update

    };

}

/**************************************************************************************************
 * SECTION 14
 * RETRY HELPER
 **************************************************************************************************/

async function retryAsync<T>(

    task: () => Promise<T>,

    retries = config.retryCount

): Promise<T> {

    let lastError: unknown;

    for (

        let attempt = 1;

        attempt <= retries;

        attempt++

    ) {

        try {

            return await task();

        }

        catch (error) {

            lastError = error;

            if (

                attempt === retries

            ) {

                break;

            }

            const delay =

                500 *

                Math.pow(

                    2,

                    attempt - 1

                );

            await new Promise(

                resolve =>

                    setTimeout(

                        resolve,

                        delay

                    )

            );

        }

    }

    throw lastError;

}

/**************************************************************************************************
 * SECTION 15
 * UPLOAD SINGLE ASSET
 **************************************************************************************************/

async function uploadAsset(

    asset: AssetFile

): Promise<UploadResult> {

    try {

        if (config.dryRun) {

            return {

                asset,

                uploaded: false,

                skipped: false,

                updated: false,

                failed: false

            };

        }

        const destination =
            buildStoragePath(asset);

        await retryAsync(

            async () => {

                await bucket.upload(

                    asset.absolutePath,

                    {

                        destination,

                        resumable: true,

                        metadata: {

                            contentType:
                                asset.mimeType,

                            cacheControl:
                                DEFAULT_CACHE_CONTROL

                        }

                    }

                );

            }

        );

        return {

            asset,

            uploaded: true,

            skipped: false,

            updated: false,

            failed: false

        };

    }

    catch (error) {

        return {

            asset,

            uploaded: false,

            skipped: false,

            updated: false,

            failed: true,

            error

        };

    }

}

/**************************************************************************************************
 * SECTION 16
 * PARALLEL UPLOAD QUEUE
 **************************************************************************************************/

async function uploadAssets(

    assets: AssetFile[]

): Promise<UploadResult[]> {

    const results: UploadResult[] = [];

    let current = 0;

    async function worker() {

        while (true) {

            const index = current++;

            if (index >= assets.length) {

                return;

            }

            const asset = assets[index];

            log.progress(

                index + 1,

                assets.length,

                asset.relativePath

            );

            const result =

                await uploadAsset(asset);

            results.push(result);

            if (result.failed) {

                log.error(

                    asset.relativePath

                );

            }

            else {

                console.log("done");

            }

        }

    }

    const workers: Promise<void>[] = [];

    for (

        let i = 0;

        i < config.concurrency;

        i++

    ) {

        workers.push(

            worker()

        );

    }

    await Promise.all(workers);

    return results;

}
/**************************************************************************************************
 * SECTION 17
 * BULK FIRESTORE METADATA WRITER
 **************************************************************************************************/

async function writeMetadata(

    results: UploadResult[]

): Promise<void> {

    if (config.dryRun) {

        return;

    }

    for (const result of results) {

        if (result.failed) {

            continue;

        }

        const asset = result.asset;

        const docId = buildDocumentId(asset);

        const document: FirestoreAsset = {

            category: asset.category,

            filename: asset.filename,

            storagePath: buildStoragePath(asset),

            extension: asset.extension,

            contentType: asset.mimeType,

            size: asset.size,

            hash: asset.hash,

            updatedAt: Timestamp.now()

        };

        writer.set(

            db.collection(config.collection).doc(docId),

            document

        );

    }

    await writer.close();

}

/**************************************************************************************************
 * SECTION 18
 * DELETE ORPHAN ASSETS
 **************************************************************************************************/

async function deleteOrphans(

    localAssets: AssetFile[],

    firestoreAssets: Map<string, FirestoreAsset>

): Promise<number> {

    if (!config.deleteOrphans) {

        return 0;

    }

    const localIds = new Set(

        localAssets.map(buildDocumentId)

    );

    let deleted = 0;

    for (

        const [docId, asset]

        of firestoreAssets

    ) {

        if (localIds.has(docId)) {

            continue;

        }

        log.warning(

            `Deleting orphan: ${asset.storagePath}`

        );

        if (!config.dryRun) {

            try {

                await bucket

                    .file(asset.storagePath)

                    .delete({

                        ignoreNotFound: true

                    });

            } catch {

                // Ignore storage delete failures

            }

            await db

                .collection(config.collection)

                .doc(docId)

                .delete();

        }

        deleted++;

    }

    return deleted;

}

/**************************************************************************************************
 * SECTION 19
 * SUMMARY
 **************************************************************************************************/

function printSummary(

    summary: Summary

): void {

    const seconds =

        (

            summary.finishedAt -

            summary.startedAt

        ) / 1000;

    console.log("");

    console.log("==========================================");

    console.log("UPLOAD SUMMARY");

    console.log("==========================================");

    console.log(`Total Files      : ${summary.total}`);

    console.log(`Uploaded         : ${summary.uploaded}`);

    console.log(`Updated          : ${summary.updated}`);

    console.log(`Skipped          : ${summary.skipped}`);

    console.log(`Deleted          : ${summary.deleted}`);

    console.log(`Failed           : ${summary.failed}`);

    console.log(`Bytes Uploaded   : ${summary.bytesUploaded}`);

    console.log(`Duration         : ${seconds.toFixed(2)} sec`);

    console.log("==========================================");

}

/**************************************************************************************************
 * SECTION 20
 * MAIN
 **************************************************************************************************/

async function runUploader() {

    const summary: Summary = {

        total: 0,

        uploaded: 0,

        updated: 0,

        skipped: 0,

        failed: 0,

        deleted: 0,

        bytesUploaded: 0,

        startedAt: Date.now(),

        finishedAt: 0

    };

    log.info("Scanning assets...");

    const localAssets =

        await discoverAssets();

    summary.total = localAssets.length;

    log.info(

        `Found ${summary.total} assets.`

    );

    log.info(

        "Loading Firestore metadata..."

    );

    const firestoreAssets =

        await loadExistingAssets();

    const comparison =

        compareAssets(

            localAssets,

            firestoreAssets

        );

    summary.skipped =

        comparison.skip.length;

    summary.updated =

        comparison.update.length;

    const uploadList = [

        ...comparison.upload,

        ...comparison.update

    ];

    log.info(

        `Uploading ${uploadList.length} assets...`

    );

    const uploadResults =

        await uploadAssets(uploadList);

    for (

        const result of uploadResults

    ) {

        if (result.failed) {

            summary.failed++;

            continue;

        }

        summary.uploaded++;

        summary.bytesUploaded +=

            result.asset.size;

    }

    log.info(

        "Writing Firestore metadata..."

    );

    await writeMetadata(uploadResults);

    summary.deleted =

        await deleteOrphans(

            localAssets,

            firestoreAssets

        );

    summary.finishedAt =

        Date.now();

    printSummary(summary);

}

/**************************************************************************************************
 * SECTION 21
 * DRY RUN
 **************************************************************************************************/

function printDryRunNotice() {

    if (!config.dryRun) {

        return;

    }

    console.log("");

    console.log("==========================================");

    console.log("DRY RUN ENABLED");

    console.log("No uploads were performed.");

    console.log("No Firestore documents changed.");

    console.log("No Storage files deleted.");

    console.log("==========================================");

    console.log("");

}

/**************************************************************************************************
 * SECTION 22
 * CONFIGURATION
 **************************************************************************************************/

function printConfiguration() {

    console.log("");

    console.log("Configuration");

    console.log("------------------------------");

    console.log(`Assets Folder : ${config.assetsFolder}`);

    console.log(`Collection    : ${config.collection}`);

    console.log(`Bucket        : ${bucket.name}`);

    console.log(`Concurrency   : ${config.concurrency}`);

    console.log(`Retry Count   : ${config.retryCount}`);

    console.log(`Dry Run       : ${config.dryRun}`);

    console.log(`Delete Missing: ${config.deleteOrphans}`);

    console.log("");

}

/**************************************************************************************************
 * SECTION 23
 * STORAGE HEALTH CHECK
 **************************************************************************************************/

async function verifyStorageAccess() {

    try {

        await bucket.exists();

        log.success(

            `Connected to bucket ${bucket.name}`

        );

    }

    catch (error) {

        throw new Error(

            `Unable to access bucket "${bucket.name}"\n${error}`

        );

    }

}

/**************************************************************************************************
 * SECTION 24
 * PERFORMANCE STATISTICS
 **************************************************************************************************/

function printPerformance(

    summary: Summary

) {

    if (

        summary.finishedAt <=

        summary.startedAt

    ) {

        return;

    }

    const seconds =

        (

            summary.finishedAt -

            summary.startedAt

        ) / 1000;

    const mb =

        summary.bytesUploaded /

        1024 /

        1024;

    const speed =

        seconds === 0

            ? 0

            : mb / seconds;

    console.log("");

    console.log("Performance");

    console.log("------------------------------");

    console.log(

        `Average Speed : ${speed.toFixed(2)} MB/s`

    );

    console.log(

        `Transferred   : ${mb.toFixed(2)} MB`

    );

    console.log("");

}

/**************************************************************************************************
 * SECTION 25
 * PROGRAM ENTRY POINT
 **************************************************************************************************/

(async () => {

    try {

        printConfiguration();

        printDryRunNotice();

        await verifyStorageAccess();

        await runUploader();

    }

    catch (error) {

        console.error("");

        console.error("==========================================");

        console.error("UPLOAD FAILED");

        console.error("==========================================");

        console.error(error);

        console.error("==========================================");

        process.exit(1);

    }

})();
