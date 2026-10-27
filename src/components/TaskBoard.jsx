import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { COLUMNS } from '../constants'
import TaskColumn from './TaskColumn'

const COLUMN_IDS = new Set(COLUMNS.map((column) => column.id))

function collisionDetection(args) {
  const collisions = closestCorners(args)
  const taskCollision = collisions.find((collision) => !COLUMN_IDS.has(collision.id))
  if (taskCollision) {
    return [taskCollision]
  }
  return collisions.filter((collision) => COLUMN_IDS.has(collision.id)).slice(0, 1)
}

function TaskBoard({
  tasks,
  searchQuery,
  totalCount,
  onDragEnd,
  onUpdate,
  onDelete,
  onMove,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const query = searchQuery.trim()
  const isFiltered = query.length > 0

  return (
    <section aria-label="Task board">
      {totalCount === 0 ? (
        <p className="board-empty" role="status">
          Your board is empty. Add a task to get started.
        </p>
      ) : null}
      {totalCount > 0 && isFiltered && tasks.length === 0 ? (
        <p className="board-empty" role="status">
          No tasks match “{query}”.
        </p>
      ) : null}
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragEnd={onDragEnd}
      >
        <div className="task-board">
          {COLUMNS.map((column) => (
            <TaskColumn
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              isFiltered={isFiltered}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))}
        </div>
      </DndContext>
    </section>
  )
}

export default TaskBoard
