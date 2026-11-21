import { useRef, useState } from 'react'
import './ShoppingForm.css'
const MAX_NAME_LENGTH = 60
const MAX_QUANTITY = 999

function validate(name, quantity) {
  const errors = {}
  const trimmed = name.trim()
  if (!trimmed) errors.name = 'Enter an item name.'
  else if (trimmed.length > MAX_NAME_LENGTH)
    errors.name = `Keep the name under ${MAX_NAME_LENGTH} characters.`

  const qty = Number(quantity)
  if (quantity === '' || !Number.isInteger(qty) || qty < 1 || qty > MAX_QUANTITY)
    errors.quantity = `Enter a whole number from 1 to ${MAX_QUANTITY}.`

  return errors
}

export default function ShoppingForm({ editingItem, onSubmit, onCancel }) {
  const isEditing = Boolean(editingItem)
  const [name, setName] = useState(editingItem ? editingItem.name : '')
  const [quantity, setQuantity] = useState(
    editingItem ? String(editingItem.quantity) : '1',
  )
  const [errors, setErrors] = useState({})
  const nameRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault() // Enter key in either field submits the form.
    const found = validate(name, quantity)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      nameRef.current?.focus()
      return
    }
    onSubmit({ name: name.trim(), quantity: Number(quantity) })
    if (!isEditing) {
      setName('')
      setQuantity('1')
      nameRef.current?.focus()
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isEditing) onCancel()
  }

  return (
    <form className="item-form" onSubmit={handleSubmit} onKeyDown={handleKeyDown} noValidate>
      <h2>{isEditing ? 'Edit item' : 'Add an item'}</h2>

      <div className="field">
        <label htmlFor="item-name">Item name</label>
        <input
          id="item-name"
          ref={nameRef}
          type="text"
          value={name}
          placeholder="e.g. Oat milk"
          autoComplete="off"
          autoFocus={isEditing}
          maxLength={MAX_NAME_LENGTH + 10}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'item-name-error' : undefined}
          onChange={(e) => {
            setName(e.target.value)
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
          }}
        />
        {errors.name && (
          <p className="field-error" id="item-name-error" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="item-quantity">Quantity</label>
        <input
          id="item-quantity"
          type="number"
          inputMode="numeric"
          min="1"
          max={MAX_QUANTITY}
          step="1"
          value={quantity}
          aria-invalid={Boolean(errors.quantity)}
          aria-describedby={errors.quantity ? 'item-quantity-error' : undefined}
          onChange={(e) => {
            setQuantity(e.target.value)
            if (errors.quantity) setErrors((prev) => ({ ...prev, quantity: undefined }))
          }}
        />
        {errors.quantity && (
          <p className="field-error" id="item-quantity-error" role="alert">
            {errors.quantity}
          </p>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Save changes' : 'Add item'}
        </button>
        {isEditing && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
