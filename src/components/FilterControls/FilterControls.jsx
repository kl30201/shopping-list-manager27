import './FilterControls.css'
const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'purchased', label: 'Purchased' },
  { id: 'remaining', label: 'Remaining' },
]

export default function FilterControls({ filter, onChange, counts }) {
  return (
    <div className="filters" role="group" aria-label="Filter items">
      {FILTERS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={`filter-btn${filter === id ? ' is-active' : ''}`}
          aria-pressed={filter === id}
          onClick={() => onChange(id)}
        >
          {label}
          <span className="filter-count">{counts[id]}</span>
        </button>
      ))}
    </div>
  )
}
