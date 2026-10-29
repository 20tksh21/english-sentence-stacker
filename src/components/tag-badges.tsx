type tagBadgesProps = {
    tags: string[];
    selectedTags: string[];
    onTagClick: (tag: string) => void;

}

export default function TagBadges({tags, selectedTags, onTagClick}: tagBadgesProps) {
    if(tags.length === 0) return null;

    return(
        <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => ( 
                <button
                    type="button"
                    key={tag}
                    onClick={() => onTagClick(tag)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        selectedTags.includes(tag)
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-green-600"
                        }
                    `}
                >
                    {tag}
                </button>
            ))}
        </div>
    )

}



