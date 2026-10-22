import { useState } from "react";
import InputForm from "./components/input-form";
import type { SentenceCardType } from "./components/sentence-card-type";
import { Volume2, Trash } from "lucide-react";
import ToolTip from "./components/tool-tip";

export default function App() {

  const [sentenceCards, setSentenceCards] = useState<SentenceCardType[]>([
    {id: 1, englishSentence: "For nothing was simply one thing.", japaneseSentence:"何一つ、ただそれだけのものではなかった。"},
    {id: 2, englishSentence: "We know what we are, but know not what we may be.", japaneseSentence:"私たちは今の自分を知っている。しかし、これから何になりうるのかは知らない。"}
  ]);

  const handleAddCard = (newCard: SentenceCardType) => {
    setSentenceCards([newCard, ...sentenceCards]); // 新しいカードを先頭に追加
  };

  const handleDeleteCard = (targetCard: SentenceCardType) => {
    setSentenceCards(sentenceCards.filter((card) => card.id !== targetCard.id))
  }

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

  return (
    <main className="text-gray-700 max-w-xl mx-auto p-4">
      {/* 追加関数をInputFormに渡す */}
      <InputForm onAddCard={handleAddCard} />

      {/* カード一覧表示 */}
      <div className="mt-6">
        {sentenceCards.map((card, index) => (
          <div key={index} className="bg-gray-50 m-4 p-5 border-2 border-green-600 shadow rounded-lg">
            <div className="flex gap-4">

              <div className="flex flex-col justify-between items-center">
                {/*スピーカーボタン */}
                <div className="relative group">
                  <button
                    onClick={() => handleEnglishSpeak(card.englishSentence)}
                    className="text-green-600 p-0.5 border-2 rounded-lg hover:text-green-300"
                  >
                    <Volume2 className="w-5 h-5"></Volume2>
                  </button>
                  <ToolTip text="音声を再生"></ToolTip>
                </div>


                {/*削除ボタン */}
                <div className="relative group">
                  <button
                    onClick={() => handleDeleteCard(card)}
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
        ))}
      </div>
    </main>
  );
}


