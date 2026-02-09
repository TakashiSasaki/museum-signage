# Ehime University Museum Digital Signage Project

## 1. Project Overview

This document outlines the development guidelines for the Ehime University Museum's interactive digital signage application. The goal is to create a captivating, stable, and easily maintainable slideshow experience using React and Framer Motion.

## 2. Core Functionality

The application presents a series of "timelines," each consisting of multiple "scenes" (images or videos).

- **Home Screen**: On startup, the user is presented with a choice of timelines.
- **Scene Display**: Once a timeline is selected, the application plays through its scenes in sequence.
  - **Ken Burns Effect**: Image scenes utilize a subtle pan-and-zoom (Ken Burns effect) to create a sense of motion.
  - **Video Playback**: Video scenes play automatically.
- **Navigation**: The slideshow progresses automatically. A progress bar at the bottom of the screen indicates the duration of the current scene. Users can also click, drag, or use arrow keys to navigate.
  - **Focus Indicator**: A "marching ants" style animated border is displayed around the application window when it has browser focus, providing a clear visual cue of its active state.

## 3. Design & Style Guide

The application's aesthetic is critical. It must feel like a natural extension of the museum.

- **Typography**: The primary font is 'Shippori Mincho', a serif font that evokes a sense of tradition and elegance.
- **Color Palette**: The core color scheme is dark and atmospheric, using a radial gradient from `#1b2735` to `#090a0f` to create depth. White text provides high contrast.
- **Layout**: The layout must be clean, intuitive, and visually balanced.
  - **Home Screen**: A full-screen, portrait-oriented layout presents four large, clickable panels. This design is non-negotiable and all styling must support this structure.
  - **Scene View**: Content is displayed full-screen with overlayed text for titles and descriptions.

## 4. Data Structure (Timelines & Scenes)

The application's content is driven by a simple JavaScript object structure defined in `src/App.jsx`.

- **`timelines` Object**: The root object, containing a key for each available timeline (e.g., `timeline1`, `timeline2`).
- **Scene Array**: Each timeline consists of an array of scene objects.
- **Scene Object**: Each scene is an object with the following properties:
  - `id`: A unique identifier for the scene.
  - `type`: Either `'image'` or `'video'`.
  - `image` or `video`: The URL path to the media asset.
  - `title`: The main title text for the scene.
  - `description`: The descriptive text for the scene.

**Example:**

```javascript
// Image Scene
{
  id: 1,
  type: 'image',
  image: 'https://picsum.photos/seed/eum/1920/1080',
  title: '愛媛大学ミュージアムへようこそ',
  description: '地球と生命の46億年の歴史を、その手で感じてください。',
  audio: '/hello.mp3',
}

// Video Scene
{
  id: 8,
  type: 'video',
  video: '/sample.mp4',
  title: '紹介動画',
  description: '博物館の紹介動画です。'
}
```

## 5. Audio Management

- Audio is defined per-scene via the optional `audio` property.
- The `useEffect` hook in `App.jsx` manages the playback lifecycle.
- **Volume Control**: The volume for audio tracks is explicitly set within this `useEffect` hook. Any adjustments to playback volume MUST be made by modifying the `audio.volume` property (where `0.0` is silent and `1.0` is maximum).

## 6. Technical Know-how and Pitfalls

This section documents key technical learnings from the development process to assist future developers and AI agents.

### **Critical Issue: Resolving Zero-Height Layouts**

A major layout issue was encountered where panels on the home screen would render with a height of zero, making them invisible. This was **not** a CSS issue in isolation, but a problem rooted in the React component structure.

-   **Problem:** A parent wrapper element, specifically `framer-motion`'s `<motion.div>`, was inserted between a parent with `height: 100%` (`.App`) and its child that also used `height: 100%` (`.home-screen`). This intermediate wrapper did **not** have a defined height.

-   **Root Cause:** The `height: 100%` CSS rule requires an unbroken chain of parent elements, each having a defined height. The intermediate `<motion.div>` broke this chain, causing the browser to calculate the height of `.home-screen` and all its descendants as zero. Endless adjustments to the CSS of the child elements could not fix this structural problem.

-   **Solution:** The component structure in `App.jsx` was refactored.
    1.  The child component (`HomeScreen`) was modified to return only its inner elements using a React Fragment (`<>...</>`), removing its own wrapping `div`.
    2.  The problematic intermediate wrapper (`<motion.div>`) was given the `className="home-screen"` directly.

-   **Key Takeaway:** When debugging layout issues where elements mysteriously have zero height, **always inspect the full DOM hierarchy in the browser's developer tools.** Look for intermediate wrapper elements that may be breaking the `height: 100%` inheritance chain. The solution often lies in refactoring the component structure, not just the stylesheet.
