import {
  Accessibility,
  Activity,
  AlertTriangle,
  Bone,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Footprints,
  GitBranch,
  Hand,
  HeartHandshake,
  Info,
  LucideIcon,
  Network,
  BrainCircuit,
  ScanSearch,
  Scissors,
  ShieldCheck,
  Stethoscope,
  Target,
  Video
} from "lucide-react";
import { SmfIconKey } from "../../content/smfPageContent";

const iconMap: Record<SmfIconKey, LucideIcon> = {
  activity: Activity,
  alert: AlertTriangle,
  arm: Accessibility,
  bandage: ShieldCheck,
  bone: Bone,
  brain: Network,
  calendar: Calendar,
  check: CheckCircle2,
  clipboard: ClipboardList,
  foot: Footprints,
  fascicles: BrainCircuit,
  hand: Hand,
  info: Info,
  microscope: ScanSearch,
  movement: Accessibility,
  nerve: Network,
  nerveSignal: GitBranch,
  rehab: HeartHandshake,
  scissors: Scissors,
  shield: ShieldCheck,
  stethoscope: Stethoscope,
  target: Target,
  video: Video
};

interface SmfIconProps {
  name: SmfIconKey;
  className?: string;
}

export function SmfIcon({ name, className }: SmfIconProps) {
  const Component = iconMap[name];
  return <Component className={className} aria-hidden="true" strokeWidth={1.8} />;
}
