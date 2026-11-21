import { memo } from 'react'
import './ShoppingItem.css'
function ShoppingItem({ item, isEditing, onToggle, onEdit, onDelete }) {
  const { id, name, quantity, purchased } = item
  const className = [
    'item-card',
    purchased ? 'is-purchased' : '',
    isEditing ? 'is-editing' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <li className={className}>
      <button
        type="button"
        className="check-btn"
        role="checkbox"
        aria-checked={purchased}
        aria-label={`${purchased ? 'Mark as pending' : 'Mark as purchased'}: ${name}`}
        onClick={() => onToggle(id)}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </button>

      <div className="item-body">
        <span className="item-name">{name}</span>
        <span className="item-status">{purchased ? 'Purchased' : 'Pending'}</span>
      </div>

      <span className="item-qty" aria-label={`Quantity ${quantity}`}>
        ×{quantity}
      </span>

      <div className="item-actions">
        <button
          type="button"
          className="icon-btn"
          aria-label={`Edit ${name}`}
          title="Edit"
          onClick={() => onEdit(id)}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        </button>
        <button
          type="button"
          className="icon-btn icon-btn-danger"
          aria-label={`Delete ${name}`}
          title="Delete"
          onClick={() => onDelete(id)}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 6h18" />
            <path d="M8 6V4h8v2" />
            <path d="M6 6l1 14h10l1-14" />
          </svg>
        </button>
      </div>
    </li>
  )
}

export default memo(ShoppingItem)
