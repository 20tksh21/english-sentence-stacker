import { BrowserRouter, Routes, Route } from "react-router-dom"
import CardPage from "./pages/card-page"
import InputPage from "./pages/input-page"
import Header from "./components/Header"
import useCardData from "./components/useCardData"
import AuthPage from "./pages/auth-page"
import ProtectedRoute from "./components/protected-route"
import { AuthProvider } from "./contexts/AuthContext"

// 認証情報のコンテキスト内で動作させるため本体を分離
function AppContent() {
  const {
    sentenceCards, 
    allTags,
    handleAddCard, handleDeleteCard, handleUpdateCard
  } = useCardData();

  return(
    <BrowserRouter>

    <Header/>

      <main className="">
        <Routes>
          {/* 未ログインでもアクセス可能な認証ページルート */}
          <Route path="/auth" element={<AuthPage />} />

          {/* ProtectedRouteでラップしてログイン必須化 */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <CardPage sentenceCards={sentenceCards} allTags={allTags}/>
              </ProtectedRoute>
            }
          />
          {/* ProtectedRouteでラップしてログイン必須化 */}
          <Route
            path="/input-page"
            element={
              <ProtectedRoute>
                <InputPage allCards={sentenceCards} allTags={allTags} onAddCard={handleAddCard} onDeleteCard={handleDeleteCard} onUpdateCard={handleUpdateCard}/>
              </ProtectedRoute>
            }
          />
          {/* ProtectedRouteでラップしてログイン必須化 */}
          <Route
            path="/edit-page/:id" 
            element={
              <ProtectedRoute>
                <InputPage allCards={sentenceCards} allTags={allTags} onAddCard={handleAddCard} onDeleteCard={handleDeleteCard} onUpdateCard={handleUpdateCard}/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  )

}

// アプリ全体をAuthProviderでラップ
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
