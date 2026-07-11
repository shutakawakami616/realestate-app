import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

// 認証状態（ログインユーザー情報）をアプリ全体で共有するためのコンテキスト
const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  // 初回のセッション取得が完了するまでのローディング状態
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 現在のセッションを取得
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // ログイン・ログアウトなどの認証状態の変化を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // メールアドレス＋パスワードでログイン
  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password })

  // メールアドレス＋パスワードで会員登録
  const signUp = (email, password) =>
    supabase.auth.signUp({ email, password })

  // ログアウト
  const signOut = () => supabase.auth.signOut()

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// 認証情報にアクセスするためのカスタムフック
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthはAuthProviderの内部で使用してください')
  }
  return context
}
