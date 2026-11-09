import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

// ログイン状態に応じてアクセスを制御するコンポーネントを定義してエクスポート
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // useAuthからユーザー情報と認証情報の読み込み中フラグを取得
  const { user, loading } = useAuth();

  // 認証情報の確認中の場合（初回アクセス時など）の表示制御
  if (loading) {
    // 画面中央にローディングメッセージを表示
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 font-medium">認証状態を確認中...</p>
      </div>
    );
  }

  // ユーザーが存在しない（未ログイン）場合
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // ログイン済みの場合はそのまま子コンポーネント（目的の画面）を表示
  return <>{children}</>;
}
