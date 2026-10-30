import { House, Plus } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export default function Header() {
    const location = useLocation(); 

const getPageTitle = (pathname: string) => {
        if (pathname === "/") {
            return "カード一覧";
        }
        if (pathname === "/input-page") {
            return "カードを追加";
        }
        // パスが "/edit/" で始まっていれば「カードを編集」を返す
        if (pathname.startsWith("/edit-page/")) {
            return "カードを編集";
        }
    };
    const title = getPageTitle(location.pathname);
    return (
        <header className="bg-gray-100 p-2 sticky top-0 z-50 flex justify-between border-b">

            <Link to="/" className=" hover:text-gray-400">
                <House/>
            </Link>

            <h2 className="text-lg">{title}</h2>

            <Link to="/input-page" className=" hover:text-gray-400">
                <Plus/>
            </Link>
            
        </header>
    )

}