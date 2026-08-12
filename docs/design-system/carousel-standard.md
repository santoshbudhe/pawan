# SPC-01 - Standard Compact Carousel

## Canonical Reference

SPC-01 is the website's default compact carousel. Its canonical mobile visual reference is the approved Specialised Procedures carousel.

- Reference image: [spc-01-specialised-procedures-mobile.jpg](references/spc-01-specialised-procedures-mobile.jpg)
- Shared card component: `src/components/design-system/StandardCompactCarousel.tsx`
- Shared carousel engine: `src/components/CarouselFrame.tsx`
- Shared tokens and styles: `src/components/design-system/standardCompactCarousel.css`
- Development preview: `/__dev/spc-01` while Vite is running in development

Do not create new carousel markup or section-specific carousel logic when SPC-01 or `CarouselFrame` supports the requested content.

## Component API

```tsx
type StandardCarouselCard = {
  id: string;
  image: string;
  imageAlt: string;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  href?: string;
  ctaLabel?: string;
  badge?: string;
  tags?: string[];
  showPlayIndicator?: boolean;
  ariaLabel?: string;
  elementId?: string;
  highlighted?: boolean;
};

type StandardCompactCarouselProps = {
  title: string;
  subtitle?: string;
  cards: StandardCarouselCard[];
  ariaLabel: string;
  className?: string;
  sectionId?: string;
  desktopColumns?: number;
  embedded?: boolean;
  variant?: "standard" | "image-title";
  onCardClick?: (event, card) => void;
};
```

Supply one card array to the shared component:

```tsx
<StandardCompactCarousel
  title="Specialised Procedures"
  cards={cards}
  ariaLabel="Specialised Procedures"
/>
```

The CTA is optional. Set both `href` and `ctaLabel` for a linked card. Omit them for an informational card. Use `badge` only for a short status such as `Selected`.

Use `embedded` when SPC-01 sits inside an existing approved panel; it removes the redundant page container without changing carousel measurements. Use `variant="image-title"` for image, optional icon, and title-only cards.

`desktopColumns` is a compatibility cap. SPC-01 intentionally limits a normal desktop viewport to three complete cards and, when more content exists, a partial next-card preview.

## Locked Mobile Measurements

These values are the mobile source of truth at a 390px viewport.

| Element | SPC-01 value |
| --- | --- |
| Section content width | 358px with 16px page padding per side |
| Section top / bottom padding | 10px / 8px |
| Section heading | 18px / 24px / 700 |
| Optional section subtitle | 15px / 22px / 400 |
| Heading-to-carousel gap | 10px |
| Card width / height | 146px / 190px |
| Card gap | 8px |
| Image width / height | 146px / 84px |
| Card title | 10px / 12px / 700 |
| Supporting text | 9px / 10.5px / 400 |
| Card radius | 10px |
| CTA row | 44px high |
| Carousel arrow | 44px target, 20px icon, -14px edge offset |
| Dot target / visible dot | 16px / 6px |

At 390px, the track displays two complete cards and part of the next card. Do not change the approved mobile card width, height, image crop, gap, peek, arrow position, dot position, typography, or section spacing during shared-engine work.

## Card Structure

1. Fixed image area with a real `<img>` and meaningful `imageAlt`.
2. Optional inline icon and tags.
3. Compact title and optional supporting text.
4. Optional 44px CTA row.

Images use `object-fit: cover` and preserve the important subject through the source crop or a deliberate `object-position`. Cards use stable dimensions to prevent layout shift.

## Shared Behavior

- `CarouselFrame` derives active position from the track's real `scrollLeft`.
- Arrows, touch swipe, mouse drag, trackpad movement, programmatic scrolling, and resize stay synchronized.
- Dots represent reachable scroll positions, not impossible empty states.
- The final dot maps to the track's real maximum scroll position.
- Arrow buttons move one logical reachable position and use real disabled states.
- Dots are clickable buttons and update the same shared state.
- Tracks use native horizontal overflow and CSS scroll snapping.
- Native scrollbars are visually hidden without disabling scrolling.
- No carousel auto-scrolls.

## Accessibility

- Previous and next controls are real buttons with descriptive labels.
- Dots are keyboard-operable buttons with `aria-current` on the active position.
- The track is a named carousel region and supports `ArrowLeft`, `ArrowRight`, `Home`, and `End`.
- Linked cards remain anchors with visible focus states.
- Controls have at least 44px touch targets.
- Motion respects `prefers-reduced-motion`.

## Responsive Behavior

- **Mobile, below 768px:** preserve the approved horizontal SPC-01 presentation with two full cards and a partial third.
- **Tablet, 768px to 959px:** approximately two complete cards and a partial third.
- **Desktop, 960px and above:** up to three complete cards and, when more content exists, a partial fourth. Cards grow responsively to a 380px maximum.
- Full-width top media follows the card width. Above the mobile breakpoint its height is derived from the approved `146 / 84` media ratio, with `object-fit: cover`; it never retains an independent fixed width.
- Controls and reachable-position dots appear at every breakpoint when the track can scroll and disappear when every card fits.
- Mobile and desktop share logic and data, not visual dimensions.

## Rules

- Do not duplicate carousel state, arrows, dots, dragging, or active-index logic.
- Do not override locked SPC-01 mobile dimensions or typography from a page component.
- Do not use viewport-based typography, `transform: scale()`, `word-break: break-all`, `overflow-wrap: anywhere`, or forced hyphenation.
- Do not add autoplay.
- Do not remove arrow, dot, swipe, keyboard, focus, or reduced-motion behavior.
- Do not scale desktop geometry down onto mobile.
- Do not create separate `mobileCards` and `desktopCards` arrays for the same content.
- Do not import the reference screenshot into production code.

## Development Checks

```powershell
npm run test:spc-01
npm run typecheck
npm run lint
npm run build
```

The contract tests cover frozen mobile tokens, card rendering, reachable pagination, active-position selection, shared scroll/resize behavior, and removal of the duplicate legacy engine.
