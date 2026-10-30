import type { SentenceCardType } from "./sentence-card-type"
import { Link } from "react-router-dom"
import { Volume2, Settings } from "lucide-react"
import ToolTip from "./tool-tip"

type SentenceCardProps = {
    card: SentenceCardType;
}

export default function SentenceCard ({card}: SentenceCardProps) {

    //スピーカーボタンの処理
    const handleEnglishSpeak = (englishText: string) => {
        //もし音声が流れてたらまずキャンセル
        window.speechSynthesis.cancel();

        //読み上げ設定
        //SpeechSynthesisUtterance→読み上げ設定を保持するインスタンス 
        const utterance = new SpeechSynthesisUtterance(englishText);
        utterance.lang = 'en-us';
        utterance.rate = 1.0; //読み上げ速度
        utterance.pitch = 1.0;  //声の高さ
    
        window.speechSynthesis.speak(utterance);
    }

    

    return(
        //カード外枠のdiv
        <div className="bg-gray-50 m-4 p-5 border-2 border-green-600 shadow rounded-lg">
            {/*本文エリアとタグエリアを縦に並べるdiv */}
            <div className="flex flex-col gap-4">

                {/*本文行のボタン部分と文章部分を横に並べるdiv */}
                <div className="flex gap-4">

                    {/*ボタンカラム */}
                    <div className="flex flex-col justify-between items-center">
                        {/*スピーカーボタン */}
                        <button
                            onClick={() => handleEnglishSpeak(card.english_sentence)}
                            className="relative group text-green-600 p-0.5 border-2 rounded-lg hover:text-green-300"
                        >
                            <Volume2 className="w-5 h-5"></Volume2>
                            <ToolTip text="音声を再生"></ToolTip>
                        </button>


                        {/*編集画面遷移ボタン */}
                        <Link
                            to={`/edit-page/${card.id}`}
                        >
                            <Settings className="hover:text-gray-400"></Settings>
                        </Link>

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
                                        className="px-3 py-0.5 text-xs rounded-full border bg-white text-gray-700 border-gray-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

}