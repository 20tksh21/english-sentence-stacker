import type { SentenceCardType } from "./sentence-card-type"
import { Volume2, Trash } from "lucide-react"
import ToolTip from "./tool-tip"

type SentenceCardProps = {
    card: SentenceCardType;
    onDelete: (card: SentenceCardType) => void;
    onSpeak: (englishText: string) => void;
}

export default function SentenceCard ({card, onDelete, onSpeak}: SentenceCardProps) {

    return(
        //カード外枠のdiv
        <main className="bg-gray-50 m-4 p-5 border-2 border-green-600 shadow rounded-lg">
            {/*本文エリアとタグエリアを縦に並べるdiv */}
            <div className="flex-col gap-4">

                {/*本文行のボタン部分と文章部分を横に並べるdiv */}
                <div className="flex gap-4">

                    {/*ボタンカラム */}
                    <div className="flex flex-col justify-between items-center">
                        {/*スピーカーボタン */}
                        <button
                            onClick={() => onSpeak(card.english_sentence)}
                            className="relative group text-green-600 p-0.5 border-2 rounded-lg hover:text-green-300"
                        >
                            <Volume2 className="w-5 h-5"></Volume2>
                            <ToolTip text="音声を再生"></ToolTip>
                        </button>


                        {/*削除ボタン */}
                        <button
                            onClick={() => onDelete(card)}
                            className="relative group mt-4 mb-1 hover:text-gray-400"
                        >
                            <Trash></Trash>
                            <ToolTip text="削除"></ToolTip>
                        </button>

                    </div>

                    {/*英文、和訳、タグを縦に並べるdiv */}
                    <div className="flex-col">
                        {/*英文＆和訳カラム */}
                        <div>
                            <p className="font-semibold text-lg">{card.english_sentence}</p>
                            <p className="text-gray-600 text-sm mt-6">{card.japanese_sentence}</p>
                        </div>

                        {/*タグエリア */}
                        {card.tags && card.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-6">
                                {card.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-0.5 text-xs rounded-full border border-green-600 text-green-700 bg-white"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                </div>




            </div>

        </main>
    )

}