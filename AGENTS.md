# Coding Agents Guide for the Museum Kiosk Application

This document outlines the core architectural and design principles for this project. All agents MUST adhere to these guidelines to ensure consistency and maintainability.

## 1. Project Overview

This is a React-based digital signage/kiosk application designed for the Ehime University Museum. It presents a looping slideshow of scenes, combining images, videos, and text to showcase exhibits. The user experience is designed to be immersive, self-running, and visually aligned with a premium, academic aesthetic.

## 2. Core Technologies

- **React**: The core UI library.
- **Framer Motion**: Used for all animations, including scene transitions and the Ken Burns effect.
- **@use-gesture/react**: Handles drag and long-press gestures for manual navigation and interaction.
- **react-canvas-confetti**: Provides a confetti effect for specific interactions.

## 3. Design & Style Guide

The application's aesthetic is critical. It must feel like a natural extension of the museum.

- **Typography**:
  - MUST use Serif fonts for a museum-grade, prestigious look.
  - **Font Family**: `'Shippori Mincho', 'serif'`.
- **Color Palette**:
  - **Background**: Deep Black (`#000` or `#111`) to blend seamlessly with the physical display's bezel.
  - **Text**: White (`#FFF`) or a slightly Off-White (`#F0F0F0`) for readability.
  - **Accent**: A Gold/Orange color (`#ffaa00`) representing academic prestige, knowledge, or natural amber.
- **Visual Effects**:
  - **Ken Burns Effect**: Static images (`type: 'image'`) MUST slowly and subtly zoom and pan (e.g., scale from 1.0 to 1.1) to create a sense of life and motion. This is implemented in the `SceneContent` component.
  - **Dark Overlay**: All text content is displayed over a semi-transparent gradient overlay to ensure high contrast and readability against varying background images/videos.
- **UI Behavior**:
  - **Cursor**: The mouse cursor is hidden (`cursor: none`) on the main application container to enhance immersion.
  - **Navigation**: The slideshow progresses automatically. A progress bar at the bottom of the screen indicates the duration of the current scene. Users can also click, drag, or use arrow keys to navigate.
  - **Focus Indicator**: A "marching ants" style animated border is displayed around the application window when it has browser focus, providing a clear visual cue of its active state.

## 4. Data Structure (The `scenes` Schema)

The entire application's content is driven by the `scenes` array of objects in `src/App.jsx`. When adding or modifying content, all agents MUST adhere to the following schema for each scene object:

```javascript
{
  id: Number,          // Unique identifier for the scene.
  type: String,        // The type of media. Must be 'image' or 'video'.
  title: String,       // The main title text for the scene.
  description: String, // The descriptive subtitle text.
  
  // Required if type is 'image'
  image: String,       // URL for the background image.
  
  // Required if type is 'video'
  video: String,       // Path to the video file (e.g., '/sample.mp4').
  
  // Optional
  audio: String,       // Path to an audio file to be played with the scene.
}
```

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

