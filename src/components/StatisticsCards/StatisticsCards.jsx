import './StatisticsCards.css'
const CARDS = [
  { key: 'total', label: 'Total items', tone: 'total' },
  { key: 'purchased', label: 'Purchased', tone: 'purchased' },
  { key: 'remaining', label: 'Remaining', tone: 'remaining' },
]

export default function StatisticsCards({ total, purchased, remaining }) {
  const values = { total, purchased, remaining }

  return (
    <section className="stats" aria-label="Shopping statistics">
      {CARDS.map(({ key, label, tone }) => (
        <article key={key} className={`stat-card stat-${tone}`}>
          <p className="stat-value" aria-live="polite">{values[key]}</p>
          <p className="stat-label">{label}</p>
        </article>
      ))}
    </section>
  )
}
