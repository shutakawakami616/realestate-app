import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../supabaseClient'
import PropertyForm from '../components/PropertyForm'

// 物件一覧画面（ログイン後の画面）
export default function PropertyList() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  // 物件一覧を取得する（RLSにより自分が登録した物件のみ返る）
  const fetchProperties = async () => {
    setLoading(true)
    setError('')

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError('物件の取得に失敗しました。' + error.message)
    } else {
      setProperties(data)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const handleLogout = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  // 物件の新規登録
  const handleCreate = async (values) => {
    setError('')

    const { error } = await supabase
      .from('properties')
      .insert({ ...values, user_id: user.id })

    if (error) {
      setError('物件の登録に失敗しました。' + error.message)
      return
    }

    setShowCreateForm(false)
    await fetchProperties()
  }

  // 物件情報の更新
  const handleUpdate = async (id, values) => {
    setError('')

    const { error } = await supabase.from('properties').update(values).eq('id', id)

    if (error) {
      setError('物件の更新に失敗しました。' + error.message)
      return
    }

    setEditingId(null)
    await fetchProperties()
  }

  // 物件の削除
  const handleDelete = async (id) => {
    if (!window.confirm('この物件を削除しますか？')) return

    setError('')

    const { error } = await supabase.from('properties').delete().eq('id', id)

    if (error) {
      setError('物件の削除に失敗しました。' + error.message)
      return
    }

    await fetchProperties()
  }

  return (
    <div className="property-page">
      <header className="property-header">
        <div>
          <h1>物件一覧</h1>
          <p className="logged-in-user">{user?.email} でログイン中</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          ログアウト
        </button>
      </header>

      {error && <p className="error-message">{error}</p>}

      <div className="property-toolbar">
        <button
          onClick={() => {
            setShowCreateForm((prev) => !prev)
            setEditingId(null)
          }}
        >
          {showCreateForm ? '登録フォームを閉じる' : '＋ 新規物件を登録'}
        </button>
      </div>

      {showCreateForm && (
        <div className="property-form-card">
          <PropertyForm
            submitLabel="登録する"
            onSubmit={handleCreate}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      {loading ? (
        <p>読み込み中...</p>
      ) : properties.length === 0 ? (
        <p>登録されている物件はありません。</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) =>
            editingId === property.id ? (
              <div className="property-form-card" key={property.id}>
                <PropertyForm
                  initialValues={property}
                  submitLabel="更新する"
                  onSubmit={(values) => handleUpdate(property.id, values)}
                  onCancel={() => setEditingId(null)}
                />
              </div>
            ) : (
              <div className="property-card" key={property.id}>
                <h2>{property.name}</h2>
                <p className="property-rent">
                  家賃：{property.rent.toLocaleString()}円 / 月
                </p>
                <p className="property-area">エリア：{property.area}</p>
                <p className="property-layout">間取り：{property.layout}</p>

                <div className="property-card-actions">
                  <button
                    onClick={() => {
                      setEditingId(property.id)
                      setShowCreateForm(false)
                    }}
                  >
                    編集
                  </button>
                  <button className="danger-button" onClick={() => handleDelete(property.id)}>
                    削除
                  </button>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  )
}
