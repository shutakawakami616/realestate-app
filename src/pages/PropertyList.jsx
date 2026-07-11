import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// 物件一覧画面用のダミーデータ
const dummyProperties = [
  { id: 1, name: 'グランドメゾン渋谷', rent: 180000, area: '東京都渋谷区' },
  { id: 2, name: 'パークハイツ横浜', rent: 120000, area: '神奈川県横浜市' },
  { id: 3, name: 'サンライズ新宿', rent: 145000, area: '東京都新宿区' },
  { id: 4, name: 'リバーサイド梅田', rent: 135000, area: '大阪府大阪市' },
  { id: 5, name: 'グリーンヒルズ札幌', rent: 90000, area: '北海道札幌市' },
  { id: 6, name: 'オーシャンビュー福岡', rent: 110000, area: '福岡県福岡市' },
]

// 物件一覧画面（ログイン後の画面）
export default function PropertyList() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login', { replace: true })
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

      <div className="property-grid">
        {dummyProperties.map((property) => (
          <div className="property-card" key={property.id}>
            <h2>{property.name}</h2>
            <p className="property-rent">
              家賃：{property.rent.toLocaleString()}円 / 月
            </p>
            <p className="property-area">エリア：{property.area}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
