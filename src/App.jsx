import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TaskBoard from './components/TaskBoard'
import TaskForm from './components/TaskForm'
import { COLUMNS } from './constants'
import {
  createTaskId,
  loadTasks,
  matchesSearch,
  saveTasks,
} from './utils/storage'
import './App.css'

function getDestinationStatus(overId) {
  if (COLUMNS.some((column) => column.id === overId)) {
    return overId
  }
  return null
}

function reorderTasks(tasks, activeId, overId) {
  const activeIndex = tasks.findIndex((task) => task.id === activeId)
  if (activeIndex === -1) {
    return tasks
  }

  const activeTask = tasks[activeIndex]
  const columnStatus = getDestinationStatus(overId)
  const overTask = tasks.find((task) => task.id === overId)

  if (!columnStatus && !overTask) {
    return tasks
  }

  const targetStatus = columnStatus ?? overTask.status
  const withoutActive = tasks.filter((task) => task.id !== activeId)
  const movedTask = { ...activeTask, status: targetStatus }

  if (columnStatus) {
    let lastIndex = -1
    for (let index = withoutActive.length - 1; index >= 0; index -= 1) {
      if (withoutActive[index].status === targetStatus) {
        lastIndex = index
        break
      }
    }
    if (lastIndex === -1) {
      return [...withoutActive, movedTask]
    }
    return [
      ...withoutActive.slice(0, lastIndex + 1),
      movedTask,
      ...withoutActive.slice(lastIndex + 1),
    ]
  }

  const overIndex = withoutActive.findIndex((task) => task.id === overId)
  if (overIndex === -1) {
    return [...withoutActive, movedTask]
  }

  return [
    ...withoutActive.slice(0, overIndex),
    movedTask,
    ...withoutActive.slice(overIndex),
  ]
}

function App() {
  const [tasks, setTasks] = useState(() => loadTasks())
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const visibleTasks = useMemo(
    () => tasks.filter((task) => matchesSearch(task, searchQuery)),
    [tasks, searchQuery],
  )

  function addTask(values) {
    setTasks((current) => [
      {
        id: createTaskId(),
        title: values.title,
        description: values.description,
        priority: values.priority,
        status: 'todo',
      },
      ...current,
    ])
  }

  function updateTask(id, values) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              title: values.title,
              description: values.description,
              priority: values.priority,
            }
          : task,
      ),
    )
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  function moveTask(id, status) {
    setTasks((current) => {
      const active = current.find((task) => task.id === id)
      if (!active || active.status === status) {
        return current
      }
      return reorderTasks(current, id, status)
    })
  }

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over) {
      return
    }
    if (active.id === over.id) {
      return
    }

    setTasks((current) => reorderTasks(current, active.id, over.id))
  }

  return (
    <div className="app-shell">
      <Header
        totalCount={tasks.length}
        filteredCount={visibleTasks.length}
        isFiltered={searchQuery.trim().length > 0}
      />
      <TaskForm onAddTask={addTask} />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <TaskBoard
        tasks={visibleTasks}
        searchQuery={searchQuery}
        totalCount={tasks.length}
        onDragEnd={handleDragEnd}
        onUpdate={updateTask}
        onDelete={deleteTask}
        onMove={moveTask}
      />
    </div>
  )
}

export default App
