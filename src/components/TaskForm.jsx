import { useState } from 'react'
import { PRIORITIES } from '../constants'
import { validateTaskFields } from '../utils/storage'

const INITIAL_FORM = {
  title: '',
  description: '',
  priority: 'Medium',
}

function TaskForm({ onAddTask }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const { errors: nextErrors, values } = validateTaskFields(form)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    onAddTask(values)
    setForm(INITIAL_FORM)
    setErrors({})
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <h2>Add a task</h2>
        <p>Capture the work, then move it as it progresses.</p>
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="task-title">Title</label>
          <input
            id="task-title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            maxLength={80}
            required
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'title-error' : undefined}
            placeholder="e.g. Review pull request"
          />
          {errors.title ? (
            <p id="title-error" className="field-error" role="alert">
              {errors.title}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            aria-invalid={Boolean(errors.priority)}
            aria-describedby={errors.priority ? 'priority-error' : undefined}
          >
            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
          {errors.priority ? (
            <p id="priority-error" className="field-error" role="alert">
              {errors.priority}
            </p>
          ) : null}
        </div>

        <div className="field field-wide">
          <label htmlFor="task-description">Description</label>
          <textarea
            id="task-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            maxLength={280}
            rows={3}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={
              errors.description ? 'description-error' : undefined
            }
            placeholder="Optional context, links, or next steps"
          />
          {errors.description ? (
            <p id="description-error" className="field-error" role="alert">
              {errors.description}
            </p>
          ) : null}
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Add task
      </button>
    </form>
  )
}

export default TaskForm
