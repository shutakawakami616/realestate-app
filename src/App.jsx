import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PropertyList from './pages/PropertyList'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="loading">読み込み中...</div>
  }

  return (
    <Routes>
      {/* ルートパスはログイン状態に応じて振り分ける */}
      <Route
        path="/"
        element={<Navigate to={user ? '/properties' : '/login'} replace />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/properties"
        element={
          <ProtectedRoute>
            <PropertyList />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
