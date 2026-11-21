import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import ShoppingForm from './components/ShoppingForm/ShoppingForm.jsx'
import ShoppingList from './components/ShoppingList/ShoppingList.jsx'
import FilterControls from './components/FilterControls/FilterControls.jsx'
import StatisticsCards from './components/StatisticsCards/StatisticsCards.jsx'
import ProgressBar from './components/ProgressBar/ProgressBar'

const STORAGE_KEY = 'shopping-list-manager:items'

const generateId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item) =>
        item &&
        typeof item.id === 'string' &&
        typeof item.name === 'string' &&
        Number.isFinite(item.quantity) &&
        typeof item.purchased === 'boolean',
    )
  } catch {
    return []
  }
}

export default function App() {
  const [items, setItems] = useState(loadItems)
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)

  // Keep localStorage in sync with every change to the list.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Storage may be full or unavailable; the app keeps working in memory.
    }
  }, [items])

  // Derived state: statistics and the filtered list are never stored.
  const stats = useMemo(() => {
    const total = items.length
    const purchased = items.filter((item) => item.purchased).length
    const remaining = total - purchased
    const progress = total === 0 ? 0 : Math.round((purchased / total) * 100)
    return { total, purchased, remaining, progress }
  }, [items])

  const visibleItems = useMemo(() => {
    if (filter === 'purchased') return items.filter((item) => item.purchased)
    if (filter === 'remaining') return items.filter((item) => !item.purchased)
    return items
  }, [items, filter])

  const editingItem = useMemo(
    () => items.find((item) => item.id === editingId) ?? null,
    [items, editingId],
  )

  const handleSubmit = useCallback(
    ({ name, quantity }) => {
      if (editingId) {
        setItems((prev) =>
          prev.map((item) =>
            item.id === editingId ? { ...item, name, quantity } : item,
          ),
        )
        setEditingId(null)
      } else {
        setItems((prev) => [
          ...prev,
          { id: generateId(), name, quantity, purchased: false },
        ])
      }
    },
    [editingId],
  )

  const handleToggle = useCallback((id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item,
      ),
    )
  }, [])

  const handleDelete = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    setEditingId((current) => (current === id ? null : current))
  }, [])

  const handleEdit = useCallback((id) => setEditingId(id), [])
  const handleCancelEdit = useCallback(() => setEditingId(null), [])

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M2 3h3l2.6 12.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6" />
            </svg>
          </span>
          <div>
            <h1>Shopping List</h1>
            <p>Plan it, pick it up, tick it off.</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <StatisticsCards
          total={stats.total}
          purchased={stats.purchased}
          remaining={stats.remaining}
        />

        <div className="dashboard">
          <aside className="panel side-panel" aria-label="Add items and progress">
            <ShoppingForm
              key={editingItem ? editingItem.id : 'new'}
              editingItem={editingItem}
              onSubmit={handleSubmit}
              onCancel={handleCancelEdit}
            />
            <ProgressBar
              percent={stats.progress}
              purchased={stats.purchased}
              total={stats.total}
            />
          </aside>

          <section className="panel list-panel" aria-label="Your items">
            <div className="list-toolbar">
              <h2>Your items</h2>
              <FilterControls
                filter={filter}
                onChange={setFilter}
                counts={{
                  all: stats.total,
                  purchased: stats.purchased,
                  remaining: stats.remaining,
                }}
              />
            </div>
            <ShoppingList
              items={visibleItems}
              filter={filter}
              totalCount={stats.total}
              editingId={editingId}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </section>
        </div>
      </main>
    </div>
  )
}
