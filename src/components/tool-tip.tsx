export default function ToolTip({text}: {text:string}) {
    return(
        <p
            className="absolute text-gray-300 text-xs px-2 py-1 bg-gray-700 rounded
            opacity-0 invisible group-hover:opacity-100 group-hover:visible
            transition-all duration-300 top-full whitespace-nowrap"
        >
            {text}
        </p> 
    )
}

