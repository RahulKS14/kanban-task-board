export const COLUMNS = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]

export const PRIORITIES = ['High', 'Medium', 'Low']

export const STORAGE_KEY = 'kanban-task-board:v1'

export const COLUMN_ORDER = COLUMNS.map((column) => column.id)
