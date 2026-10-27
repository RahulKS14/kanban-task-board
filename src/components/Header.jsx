function Header({ totalCount, filteredCount, isFiltered }) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Sprint 05</p>
        <h1>Kanban Task Board</h1>
        <p className="subtitle">
          Track work across To Do, In Progress, and Done. Drag cards, search in
          real time, and keep edits on this device.
        </p>
      </div>
      <p className="task-count" aria-live="polite">
        {isFiltered
          ? `${filteredCount} of ${totalCount} tasks shown`
          : `${totalCount} ${totalCount === 1 ? 'task' : 'tasks'}`}
      </p>
    </header>
  )
}

export default Header
