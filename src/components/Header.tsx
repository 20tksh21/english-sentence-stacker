import { House, Plus } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export default function Header() {
    const location = useLocation(); 

    const getPageTitle = (pathname: string) => {
        switch (pathname) {
            case "/":
                return "カード一覧";
            case "/input-page":
                return "カード追加";
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