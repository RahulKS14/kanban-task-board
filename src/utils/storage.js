import { COLUMNS, STORAGE_KEY } from '../constants'

const COLUMN_IDS = new Set(COLUMNS.map((column) => column.id))
const PRIORITIES = new Set(['High', 'Medium', 'Low'])

function isValidTask(task) {
  return (
    task &&
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    typeof task.description === 'string' &&
    PRIORITIES.has(task.priority) &&
    COLUMN_IDS.has(task.status)
  )
}

export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return getSampleTasks()
    }

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return getSampleTasks()
    }

    return parsed.filter(isValidTask)
  } catch {
    return getSampleTasks()
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // Storage can fail in private mode; the board still works in-memory.
  }
}

export function createTaskId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function getSampleTasks() {
  return [
    {
      id: createTaskId(),
      title: 'Plan sprint scope',
      description: 'Confirm must-have stories and acceptance criteria.',
      priority: 'High',
      status: 'todo',
    },
    {
      id: createTaskId(),
      title: 'Design board layout',
      description: 'Sketch columns, cards, and empty states for mobile.',
      priority: 'Medium',
      status: 'in-progress',
    },
    {
      id: createTaskId(),
      title: 'Set up Vite project',
      description: 'Initialize React tooling and folder structure.',
      priority: 'Low',
      status: 'done',
    },
  ]
}

export function matchesSearch(task, query) {
  const needle = query.trim().toLowerCase()
  if (!needle) {
    return true
  }

  return (
    task.title.toLowerCase().includes(needle) ||
    task.description.toLowerCase().includes(needle)
  )
}

export function validateTaskFields({ title, description, priority }) {
  const errors = {}
  const trimmedTitle = title.trim()
  const trimmedDescription = description.trim()

  if (!trimmedTitle) {
    errors.title = 'Title is required.'
  } else if (trimmedTitle.length > 80) {
    errors.title = 'Title must be 80 characters or fewer.'
  }

  if (trimmedDescription.length > 280) {
    errors.description = 'Description must be 280 characters or fewer.'
  }

  if (!PRIORITIES.has(priority)) {
    errors.priority = 'Choose High, Medium, or Low priority.'
  }

  return {
    errors,
    values: {
      title: trimmedTitle,
      description: trimmedDescription,
      priority,
    },
  }
}
