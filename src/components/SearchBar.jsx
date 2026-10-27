function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="task-search">Search tasks</label>
      <input
        id="task-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Filter by title or description"
        autoComplete="off"
      />
    </div>
  )
}

export default SearchBar
