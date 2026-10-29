import { useState, useMemo } from "react";
import type { SentenceCardType } from "../components/sentence-card-type";
import TagBadges from "../components/tag-badges";
import { Tag } from "lucide-react";
import SentenceCard from "../components/sentence-card";

type CardPageProps = {
    sentenceCards: SentenceCardType[];
    allTags: string[];
    onDelete: (card: SentenceCardType) => void;
}

export default function CardPage({sentenceCards, allTags, onDelete}: CardPageProps) {

    const [searchSelectedTag, setSearchSelectedTag] = useState<string[]>([]);



    const filteredCards: SentenceCardType[] = useMemo(() => {
        if (searchSelectedTag.length === 0) return sentenceCards;

        // 選択されたすべてのタグを網羅しているカードだけに絞り込む(AND検索)
        return sentenceCards.filter((card) => 
        card.tags && searchSelectedTag.every((tag) => card.tags.includes(tag))
        );
    }, [sentenceCards, searchSelectedTag]);


    //タグバッジを押したときの処理
    const handleSearchTagSelect = (tag: string) => {
        if (!searchSelectedTag.includes(tag)) {
        setSearchSelectedTag([...searchSelectedTag, tag]);
        } else {
        setSearchSelectedTag(searchSelectedTag.filter((t) => t !== tag));
        }
    }

    return (
        <div className="text-gray-700 max-w-xl mx-auto p-4">

            <p className="font-semibold p-4">タグで絞り込み</p>
            <div className="flex gap-2 px-4">
                <Tag/>
                <TagBadges
                    tags={allTags}
                    selectedTags={searchSelectedTag}
                    onTagClick={handleSearchTagSelect}
                />
            </div>


            {/* カード一覧表示 */}
            <div className="mt-6">
            {filteredCards.map((card) => (
                <SentenceCard
                key={card.id}
                card={card}
                onDelete={onDelete}
                />
            ))}
            </div>
        </div>
    );
}