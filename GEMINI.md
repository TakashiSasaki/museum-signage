# **AI Development Guidelines for React in Firebase Studio**

These guidelines define the operational principles and capabilities of an AI agent (e.g., Gemini) interacting with React projects within the Firebase Studio environment. The goal is to enable an efficient, automated, and error-resilient application design and development workflow, focusing on modern React practices.

## **Environment & Context Awareness**

The AI operates within the Firebase Studio development environment, which provides a Code OSS-based IDE with deep integration for React and Firebase services.

* **Project Structure:** The AI assumes a standard React project structure, likely initialized with Vite. The primary application entry point is typically `src/main.jsx` or `src/main.tsx`.
* **`dev.nix` Configuration:**
  * The `.idx/dev.nix` file is the declarative source of truth for the workspace environment. The AI understands its role in defining:
    * Required system tools (e.g., `pkgs.nodejs_20`).
    * IDE extensions.
    * Environment variables.
    * Startup commands (`idx.workspace.onStart`).
  * The AI should leverage `dev.nix` to ensure environment consistency and to automatically configure necessary tools or verify their presence.
* **Preview Server:**
  * Firebase Studio provides a running preview server for the web, configured in `dev.nix`.
  * The `web` preview is configured to run `npm run dev -- --port $PORT --host 0.0.0.0`, meaning the Vite dev server is already running and available on a specific port.
  * The AI will continuously monitor the output of the preview server for real-time feedback on changes.
* **Firebase Integration:** The AI recognizes standard Firebase integration patterns in React, including the use of a `firebase.js` or `firebase.ts` configuration file and interactions with various Firebase SDKs.

## **Code Modification & Dependency Management**

The AI is empowered to modify the React codebase and manage its dependencies autonomously based on user requests and detected issues. The AI is creative and anticipates features that the user might need even if not explicitly requested.

* **Core Code Assumption:** When a user requests a change (e.g., "Add a button to navigate to a new page"), the AI will primarily focus on modifying the JSX/TSX code. `src/App.jsx` (or `tsx`) is assumed to be the main component, and the AI will infer other relevant files (e.g., creating new component files, updating `package.json`).
* **Package Management:** If a new feature requires an external package, the AI will identify the most suitable and stable package from npm.
  * To add a regular dependency, it will execute `npm install <package_name>`.
  * To add a development dependency (e.g., for testing or linting), it will execute `npm install -D <package_name>`.
* **Code Quality:** The AI aims to adhere to React best practices, including:
  * Clean code structure and separation of concerns (e.g., UI logic separate from business logic).
  * Meaningful and consistent naming conventions.
  * Effective use of functional components and hooks.
  * Appropriate state management solutions (e.g., component state, context, or a dedicated library like Zustand or Redux Toolkit).
  * Proper use of `async/await` for asynchronous operations with robust error handling.

## **Automated Error Detection & Remediation**

A critical function of the AI is to continuously monitor for and automatically resolve errors to maintain a runnable and correct application state.

* **Post-Modification Checks:** After *every* code modification (including adding packages, or modifying existing files), the AI will:
  1. Monitor the IDE's diagnostics (problem pane) and the terminal output for compilation errors, linting warnings, and runtime exceptions.
  2. Check the Vite dev server's output for rendering issues, application crashes, or unexpected behavior.
* **Automatic Error Correction:** The AI will attempt to automatically fix detected errors. This includes, but is not limited to:
  * Syntax errors in JSX/TSX code.
  * Type mismatches (if using TypeScript).
  * Unresolved imports or missing package references.
  * Linting rule violations (the AI will automatically run `eslint . --fix`).
  * Common React-specific issues such as incorrect hook usage, or invalid component returns.
* **Problem Reporting:** If an error cannot be automatically resolved (e.g., a logic error requiring user clarification, or an environment issue), the AI will clearly report the specific error message, its location, and a concise explanation with a suggested manual intervention or alternative approach to the user.

## **Styling**

The AI will use a consistent styling approach, using the existing plain CSS files (e.g., `App.css`, `index.css`) that are already present in the project. The AI will respect and maintain this pattern instead of introducing CSS Modules, Tailwind CSS, or CSS-in-JS libraries.

## **Visual Design**

**Aesthetics:** The AI always makes a great first impression by creating a unique user experience that incorporates modern components, a visually balanced layout with clean spacing, and polished styles that are easy to understand.

1. Build beautiful and intuitive user interfaces that follow modern design guidelines.
2. Ensure your app is mobile responsive and adapts to different screen sizes, working perfectly on mobile and web.
3. Propose colors, fonts, typography, iconography, animation, effects, layouts, texture, drop shadows, gradients, etc.
4. If images are needed, make them relevant and meaningful, with appropriate size, layout, and licensing (e.g., freely available). If real images are not available, provide placeholder images.
5. If there are multiple pages for the user to interact with, provide an intuitive and easy navigation bar or controls.

**Bold Definition:** The AI uses modern, interactive iconography, images, and UI components like buttons, text fields, animation, effects, gestures, sliders, carousels, navigation, etc.

1. Fonts \- Choose expressive and relevant typography. Stress and emphasize font sizes to ease understanding, e.g., hero text, section headlines, list headlines, keywords in paragraphs, etc.
2. Color \- Include a wide range of color concentrations and hues in the palette to create a vibrant and energetic look and feel.
3. Texture \- Apply subtle noise texture to the main background to add a premium, tactile feel.
4. Visual effects \- Multi-layered drop shadows create a strong sense of depth. Cards have a soft, deep shadow to look "lifted."
5. Iconography \- Incorporate icons to enhance the user’s understanding and the logical navigation of the app.
6. Interactivity \- Buttons, checkboxes, sliders, lists, charts, graphs, and other interactive elements have a shadow with elegant use of color to create a "glow" effect.

## **Accessibility or A11Y Standards:** The AI implements accessibility features to empower all users, assuming a wide variety of users with different physical abilities, mental abilities, age groups, education levels, and learning styles.

## **Routing and Navigation**

The application uses state-based condition rendering for routing and scene transitions. The AI will understand and maintain this state-based manual routing.

## **Component Implementation**

The project relies on standard React DOM components and `framer-motion` for animations without an external UI component library (no MUI, Ant Design, etc.). The AI should implement UI using standard HTML elements.

## **Best Practices for Implementation**

### **Code Consistency**

The AI will maintain a consistent coding style and structure throughout the project, including naming conventions and file organization.

## **State Management**

The AI will use the simplest appropriate state management solution for the job.

* **Component State (`useState`, `useReducer`):** For local state that is not shared with other components.
* **Context API (`useContext`):** For state that needs to be shared with a few components, but not globally.
* The project does not use state management libraries like Zustand or Redux Toolkit. State should be managed via React's built-in hooks.

## **Test Generation & Execution**

When requested, the AI will facilitate the creation and execution of tests, ensuring code reliability and validating functionality.

* **Test Writing:**
  * Upon user request for tests (e.g., "Write tests for this new feature"), the AI will generate appropriate test files (e.g., `src/components/MyComponent.test.jsx`).
  * The AI will use Vitest as the testing framework and React Testing Library for rendering and interacting with components.
  * Tests will be designed to cover different component states, user interactions, and edge cases.
* **Automated Test Execution:**
  * After generating or modifying tests, and after any significant code change, the AI will automatically execute the relevant tests using `npm test` in the terminal.
  * The AI will report test results (pass/fail, with details on failures) to the user.

## **Iterative Development & User Interaction**

The AI's workflow is iterative, transparent, and responsive to user input.

* **Plan Generation & Blueprint Management:** Each time the user requests a change, the AI will first generate a clear plan overview and a list of actionable steps. This plan will then be used to **create or update a blueprint.md file** in the project's root directory (or a designated docs folder if specified).
  * The blueprint.md file will serve as a single source of truth, containing:
    * A section with a concise overview of the purpose and capabilities.
    * A section with a detailed outline documenting the project, including all style, design, and features implemented in the application from the initial version to the current version.
    * A section with a detailed section outlining the plan and steps for the current requested change.
  * Before initiating any new change or at the start of a new chat session, the AI will reference the blueprint.md to ensure full context and understanding of the application's current state and existing features. This ensures consistency and avoids redundant or conflicting modifications.
* **Prompt Understanding:** The AI will interpret user prompts to understand the desired changes, new features, bug fixes, or questions. It will ask clarifying questions if the prompt is ambiguous.
* **Contextual Responses:** The AI will provide conversational and contextual responses, explaining its actions, progress, and any issues encountered. It will summarize changes made.
* **Error Checking Flow:**
  1. **Code Change:** AI applies a code modification.
  2. **Lint/Format:** AI runs `eslint . --fix`.
  3. **Dependency Check:** If `package.json` was modified, AI runs `npm install`.
  4. **Compile & Analyze:** AI monitors the terminal for Vite and linter errors.
  5. **Test Execution:** If tests were requested or modified, AI runs `npm test`.
  6. **Preview Check:** AI observes the browser preview for visual and runtime errors.
  7. **Remediation/Report:** If errors are found, AI attempts automatic fixes. If unsuccessful, it reports details to the user.


# Firebase MCP

When requested for Firebase add the following the server configurations to .idx/mcp.json. Just add the following and don't add anything else.

{
    "mcpServers": {
        "firebase": {
            "command": "npx",
            "args": [
                "-y",
                "firebase-tools@latest",
                "experimental:mcp"
            ]
        }
    }
}