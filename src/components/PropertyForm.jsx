import { useState } from 'react'

// 物件の新規登録・編集で共通利用するフォーム
export default function PropertyForm({ initialValues, onSubmit, onCancel, submitLabel }) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [rent, setRent] = useState(initialValues?.rent ?? '')
  const [area, setArea] = useState(initialValues?.area ?? '')
  const [layout, setLayout] = useState(initialValues?.layout ?? '')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    await onSubmit({
      name,
      rent: Number(rent),
      area,
      layout,
    })

    setSubmitting(false)
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <label>
        物件名
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>

      <label>
        家賃（円）
        <input
          type="number"
          min="0"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          required
        />
      </label>

      <label>
        エリア
        <input value={area} onChange={(e) => setArea(e.target.value)} required />
      </label>

      <label>
        間取り
        <input
          placeholder="例：1LDK"
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          required
        />
      </label>

      <div className="property-form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? '保存中...' : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            className="secondary-button"
            onClick={onCancel}
            disabled={submitting}
          >
            キャンセル
          </button>
        )}
      </div>
    </form>
  )
}
