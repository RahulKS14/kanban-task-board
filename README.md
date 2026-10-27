# Kanban Task Board

🔗 **Live Demo:** [https://kanban-task-board-liard.vercel.app/](https://kanban-task-board-liard.vercel.app/)

Sprint 05 React dashboard for tracking work across **To Do**, **In Progress**, and **Done**. Tasks persist in the browser with LocalStorage, can be edited inline, searched in real time, and moved with buttons or drag-and-drop.

## Features

- Three-column Kanban board
- Add tasks with title, description, and High / Medium / Low priority
- Delete tasks with confirmation
- Move tasks between columns with buttons
- Inline edit with Save and Cancel
- LocalStorage save and restore
- Drag-and-drop with [@dnd-kit](https://dndkit.com/)
- Real-time search across titles and descriptions
- Responsive dashboard UI, accessible labels, validation, and empty states

## Tech stack

- React 19
- Vite
- JavaScript
- CSS
- `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`

## Getting started

Prerequisites: Node.js 20 or later.

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal (usually `http://localhost:5173`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |

## Project structure

```text
src/
  App.jsx
  components/
    Header.jsx
    SearchBar.jsx
    TaskForm.jsx
    TaskBoard.jsx
    TaskColumn.jsx
    TaskCard.jsx
  constants.js
  utils/storage.js
```

## Data persistence

Tasks are stored in `localStorage` under the key `kanban-task-board:v1`. Clearing site data for this origin will reset the board. The first visit seeds a few sample tasks so the layout is easy to explore.

## Accessibility notes

- Form fields have associated labels and validation messages
- Columns are labeled regions
- Drag handles and move actions have accessible names
- Keyboard dragging is available through dnd-kit keyboard sensors
- Empty states are announced with `role="status"` where useful

## Deploying later

This project is ready to push to GitHub and host on Vercel after you create a repository and connect it. Remaining deployment steps are listed in the project wrap-up notes, not performed automatically here.
