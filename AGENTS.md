# Project Context: Museum Signage for Ehime University

## 1. Project Overview

This project is a **touch-interactive digital signage application** designed for
the entrance of the **Ehime University Museum (EUM)**.
The goal is to attract visitors with high-quality visuals (insects, minerals)
and provide museum information.

## 2. Tech Stack & Libraries (Overrides default)

While `GEMINI.md` suggests general libraries, this project **strictly enforces**
the following:

- **Animation**: `framer-motion` (REQUIRED for all transitions).
- **Gestures**: `@use-gesture/react` (REQUIRED for swipe/touch interaction).
- **Styling**:
  - Use **Inline Styles** or **CSS Modules** for component-level scoping.
  - **Do NOT** install Tailwind CSS or MUI unless explicitly requested (keep the
    bundle lightweight and custom).

## 3. Design System (Strict Adherence)

The aesthetic must be **"Academic, Authentic, and Calm"**.

- **Typography**:
  - MUST use Serif fonts for a museum-grade look.
  - Font Family: `'Shippori Mincho', 'serif'`.
- **Color Palette**:
  - Background: Deep Black (`#000` or `#111`) to blend with the display bezel.
  - Text: White (`#FFF`) or Off-White (`#F0F0F0`).
  - Accent: Gold/Orange (`#ffaa00`) representing academic prestige or amber.
- **Visual Effects**:
  - **Ken Burns Effect**: Static images MUST slowly zoom/scale
    (e.g., scale 1.0 -> 1.1) to create life.
  - **Dark Overlay**: Text overlays must have a gradient background
    (transparent to black) to ensure readability.
- **UI Behavior**:
  - **Cursor**: Hidden (`cursor: none`) on the main container.
  - **Navigation**: Dot indicators or progress bars at the bottom.

## 4. Data Structure (SCENES Schema)

The application content is driven by a `scenes` constant.
Modifications must adhere to this schema:

```javascript
{
  id: number,
  type: 'image' | 'video',
  image?: string, // For image scenes
  video?: string, // For video scenes
  title: string,     // Main heading (e.g., "Biodiversity")
  description: string,  // Sub heading (e.g., "Insects of Shikoku")
}
```

## 5. Interaction Logic

- **Auto-Play**: The sequence advances automatically based on a global timer.
- **Touch Pause**: While the user is touching/pressing the screen, the
  auto-advance timer MUST pause.
- **Swipe**: Left/Right swipes must navigate to Next/Prev scenes immediately.

## 6. Development Workflow (Addendum to GEMINI.md)

- When adding new scenes, ensure high-resolution placeholders are used.
- **Progress Bar**: Maintain the visual progress bar at the bottom indicating
  time remaining for the current scene.
