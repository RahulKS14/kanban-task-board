import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { COLUMNS, PRIORITIES } from '../constants'
import { validateTaskFields } from '../utils/storage'

function TaskCard({ task, onUpdate, onDelete, onMove }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
  })
  const [errors, setErrors] = useState({})

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { status: task.status },
    disabled: isEditing,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  function startEditing() {
    setDraft({
      title: task.title,
      description: task.description,
      priority: task.priority,
    })
    setErrors({})
    setIsEditing(true)
  }

  function cancelEditing() {
    setDraft({
      title: task.title,
      description: task.description,
      priority: task.priority,
    })
    setErrors({})
    setIsEditing(false)
  }

  function saveEditing(event) {
    event.preventDefault()
    const { errors: nextErrors, values } = validateTaskFields(draft)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    onUpdate(task.id, values)
    setIsEditing(false)
  }

  function handleDelete() {
    const confirmed = window.confirm(`Delete “${task.title}”? This cannot be undone.`)
    if (confirmed) {
      onDelete(task.id)
    }
  }

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`task-card${isDragging ? ' is-dragging' : ''}`}
      aria-labelledby={`task-title-${task.id}`}
    >
      {isEditing ? (
        <form className="edit-form" onSubmit={saveEditing} noValidate>
          <div className="field">
            <label htmlFor={`edit-title-${task.id}`}>Title</label>
            <input
              id={`edit-title-${task.id}`}
              value={draft.title}
              onChange={(event) =>
                setDraft((current) => ({ ...current, title: event.target.value }))
              }
              maxLength={80}
              required
              aria-invalid={Boolean(errors.title)}
            />
            {errors.title ? (
              <p className="field-error" role="alert">
                {errors.title}
              </p>
            ) : null}
          </div>
          <div className="field">
            <label htmlFor={`edit-description-${task.id}`}>Description</label>
            <textarea
              id={`edit-description-${task.id}`}
              value={draft.description}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              maxLength={280}
              rows={3}
            />
            {errors.description ? (
              <p className="field-error" role="alert">
                {errors.description}
              </p>
            ) : null}
          </div>
          <div className="field">
            <label htmlFor={`edit-priority-${task.id}`}>Priority</label>
            <select
              id={`edit-priority-${task.id}`}
              value={draft.priority}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  priority: event.target.value,
                }))
              }
            >
              {PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
          <div className="card-actions">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button type="button" className="btn" onClick={cancelEditing}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="card-top">
            <button
              type="button"
              className="drag-handle"
              aria-label={`Drag ${task.title}`}
              {...attributes}
              {...listeners}
            >
              ⋮⋮
            </button>
            <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
          </div>
          <h3 id={`task-title-${task.id}`}>{task.title}</h3>
          {task.description ? (
            <p className="card-description">{task.description}</p>
          ) : (
            <p className="card-description muted">No description</p>
          )}
          <div className="card-actions">
            <button type="button" className="btn" onClick={startEditing}>
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
          <div className="move-actions" role="group" aria-label="Move task">
            {COLUMNS.filter((column) => column.id !== task.status).map((column) => (
              <button
                key={column.id}
                type="button"
                className="btn btn-ghost"
                onClick={() => onMove(task.id, column.id)}
              >
                Move to {column.title}
              </button>
            ))}
          </div>
        </>
      )}
    </article>
  )
}

export default TaskCard
