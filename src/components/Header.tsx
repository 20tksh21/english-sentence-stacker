import { House, Plus, LogOut } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Header() {
    const location = useLocation(); 
    const { signOut, user } = useAuth();

    const getPageTitle = (pathname: string) => {
        if (pathname === "/") {
            return "カード一覧";
        }
        if (pathname === "/input-page") {
            return "カードを追加";
        }

        if (pathname.startsWith("/edit-page/")) {
            return "カードを編集";
        }

        if (pathname === "/auth") {
            return "認証";
        }
    };
    const title = getPageTitle(location.pathname);

    // ログアウトボタン押下時の処理
    const handleSignOut = async () => {
        await signOut();
    };

    if (location.pathname === "/auth") {
        return null;
    }

    return (
        <header className="bg-gray-100 p-2 sticky top-0 z-50 flex justify-between items-center border-b">

            <Link to="/" className=" hover:text-gray-400">
                <House/>
            </Link>

            <h2 className="text-lg">{title}</h2>

            <div className="flex items-center gap-3">
                <Link to="/input-page" className=" hover:text-gray-400">
                    <Plus/>
                </Link>

                {/* ログイン中のみログアウトボタンを表示 */}
                {user && (
                    <button
                        onClick={handleSignOut}
                        title="ログアウト"
                        className="hover:text-red-600 text-gray-600 transition-colors p-1"
                    >
                        <LogOut size={20} />
                    </button>
                )}
            </div>
            
        </header>
    )

}
