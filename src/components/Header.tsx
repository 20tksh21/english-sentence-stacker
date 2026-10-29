import { House } from "lucide-react"
import { Plus } from "lucide-react"

type HeaderProps = {
    pageTitle: string;
}

export default function Header({pageTitle}: HeaderProps) {
    return (
        <header className="bg-gray-100 p-2 sticky top-0 z-50 flex justify-between border-b">
            <House/>
            <h2 className="text-lg">{pageTitle}</h2>
            <Plus/>
        </header>
    )

}