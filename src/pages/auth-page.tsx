import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function AuthPage() {
  const navigate = useNavigate();
  // AuthContextからサインイン関数とサインアップ関数を取得
  const { signIn, signUp } = useAuth();

  // 現在のモードが「新規登録」か「ログイン」かを判定するstate（初期値はログインモード: false）
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [infoMessage, setInfoMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // フォーム送信時の処理を行う関数
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setInfoMessage("");
    // 送信中フラグをtrueにして二重送信を防止
    setIsSubmitting(true);

    // 新規登録モードの場合の分岐処理
    if (isSignUp) {
      // Supabaseのユーザー登録関数を実行
      const { error } = await signUp(email, password);
      if (error) {
        setErrorMessage(error.message);
      } else {
        setInfoMessage("確認メールを送信しました。");
      }


    // ログインモードの場合の分岐処理
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setErrorMessage(error.message);
      } else {
        navigate("/");
      }
    }

    setIsSubmitting(false);
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        
        {/* モードに応じた画面タイトルを表示 */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isSignUp ? "アカウント新規登録" : "ログイン"}
        </h1>

        {/* エラーメッセージが存在する場合に赤色の警告枠を表示 */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
            {errorMessage}
          </div>
        )}

        {/* 案内メッセージが存在する場合に緑色の情報枠を表示 */}
        {infoMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded">
            {infoMessage}
          </div>
        )}

        {/* 入力フォーム本体 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              メールアドレス
            </label>

            {/* メールアドレスの入力ボックス */}
            <input
              type="email" // メールアドレス形式のバリデーションを適用
              required // 入力必須
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border border-green-600 rounded-md focus:outline-none bg-white" // スタイル設定
            />
          </div>

          {/* パスワード入力項目 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              パスワード
            </label>

            {/* パスワードの入力ボックス */}
            <input
              type="password" // 入力文字をマスク
              required 
              minLength={6} // Supabase Authの最小要件である6文字以上を設定
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-2.5 border border-green-600 rounded-md focus:outline-none bg-white" 
            />
          </div>

          {/* 送信ボタン */}
          <button
            type="submit"
            disabled={isSubmitting} // 通信中はボタンを無効化
            className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-md shadow transition duration-150 disabled:opacity-50"
          >
            {/* 送信中はテキストを切り替え、通常時はモード名を表示 */}
            {isSubmitting ? "処理中..." : isSignUp ? "登録する" : "ログインする"}
          </button>
        </form>


        {/* ログイン・新規登録のモード切り替え部分 */}
        <div className="mt-6 text-center text-sm text-gray-600">
          {/* 切り替えボタン */}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp); 
              setErrorMessage(""); 
              setInfoMessage(""); 
            }}
            className="text-green-600 hover:underline font-semibold" // リンク風のスタイル設定
          >
            {/* 現在と逆のモードへ誘導するテキスト */}
            {isSignUp
              ? "ログイン"
              : "新規登録"}
          </button>
        </div>

      </div>
    </div>
  );
}
