import ShoppingItem from '../ShoppingItem/ShoppingItem.jsx'
import './ShoppingList.css'
const EMPTY_FILTER_MESSAGES = {
  purchased: {
    title: 'Nothing purchased yet',
    text: 'Mark items as purchased and they will show up here.',
  },
  remaining: {
    title: 'Nothing left to buy',
    text: 'Every item on your list has been purchased.',
  },
}

export default function ShoppingList({
  items,
  filter,
  totalCount,
  editingId,
  onToggle,
  onEdit,
  onDelete,
}) {
  if (totalCount === 0) {
    return (
      <div className="empty-state">
        <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M2 3h3l2.6 12.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6" />
        </svg>
        <h3>Your list is empty</h3>
        <p>Add your first item using the form to get started.</p>
      </div>
    )
  }

  if (items.length === 0) {
    const message = EMPTY_FILTER_MESSAGES[filter]
    return (
      <div className="empty-state">
        <h3>{message.title}</h3>
        <p>{message.text}</p>
      </div>
    )
  }

  return (
    <ul className="item-list">
      {items.map((item) => (
        <ShoppingItem
          key={item.id}
          item={item}
          isEditing={item.id === editingId}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
