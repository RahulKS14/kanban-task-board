import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TaskCard from './TaskCard'

function TaskColumn({
  column,
  tasks,
  isFiltered,
  onUpdate,
  onDelete,
  onMove,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: 'column', status: column.id },
  })

  return (
    <section
      className={`task-column${isOver ? ' is-over' : ''}`}
      aria-labelledby={`column-${column.id}`}
    >
      <header className="column-header">
        <h2 id={`column-${column.id}`}>{column.title}</h2>
        <span className="column-count" aria-label={`${tasks.length} tasks`}>
          {tasks.length}
        </span>
      </header>
      <div ref={setNodeRef} className="column-body">
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.length === 0 ? (
            <p className="empty-state">
              {isFiltered
                ? 'No matching tasks in this column.'
                : 'No tasks in this column yet.'}
            </p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onMove={onMove}
              />
            ))
          )}
        </SortableContext>
      </div>
    </section>
  )
}

export default TaskColumn
