# Prompts

This file records the Sprint 05 implementation prompt used to build the Kanban Task Board.

## Project prompt

Build a complete Sprint 05 Kanban Task Board in the `kanban-task-board` workspace using React.js, Vite, JavaScript, and modern responsive CSS.

Inspect the workspace first and preserve useful existing files. If empty, initialize a Vite React JavaScript project.

Required features:

1. Three columns: To Do, In Progress, and Done.
2. Add tasks with title, description, and High/Medium/Low priority.
3. Delete tasks.
4. Move tasks between columns using buttons.
5. Inline task editing with Save and Cancel.
6. Save and restore tasks using LocalStorage.
7. Drag-and-drop between columns using dnd-kit.
8. Real-time search across task titles and descriptions.
9. Modern, professional, mobile-responsive dashboard UI.
10. Accessible controls, validation, and empty states.

Use reusable components: Header, TaskForm, SearchBar, TaskBoard, TaskColumn, and TaskCard. Use React `useState` and `useEffect`, props, and immutable state updates. Do not use Redux or direct DOM manipulation.

Create `README.md` and root-level `Prompts.md`. Ensure `node_modules` is ignored by Git.

Install dependencies, implement the features, run available lint checks and the production build, and fix errors.

Do not claim tests passed unless they were actually performed. Do not claim deployment is complete without verifying it.

At the end, report implemented features, actual build/test results, known limitations, and remaining steps for GitHub and Vercel deployment.
