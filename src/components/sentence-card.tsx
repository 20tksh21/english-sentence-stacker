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
        <div className="bg-gray-50 m-4 p-5 border-2 border-green-600 shadow rounded-lg">
            <div className="flex gap-4">

              <div className="flex flex-col justify-between items-center">
                {/*スピーカーボタン */}
                <div className="relative group">
                  <button
                    onClick={() => onSpeak(card.englishSentence)}
                    className="text-green-600 p-0.5 border-2 rounded-lg hover:text-green-300"
                  >
                    <Volume2 className="w-5 h-5"></Volume2>
                  </button>
                  <ToolTip text="音声を再生"></ToolTip>
                </div>


                {/*削除ボタン */}
                <div className="relative group">
                  <button
                    onClick={() => onDelete(card)}
                    className="mt-4 mb-1 hover:text-gray-400"
                  >
                    <Trash></Trash>
                  </button>
                  <ToolTip text="削除"></ToolTip>
                </div>

              </div>

              {/*英文＆和訳 */}
              <div>
                <h2 className="font-semibold text-lg">{card.englishSentence}</h2>
                <p className="text-gray-600 text-sm mt-4">{card.japaneseSentence}</p>
              </div>
            </div>
        </div>
    )

}