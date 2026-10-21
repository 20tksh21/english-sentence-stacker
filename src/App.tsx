import { useState } from "react";
import InputForm from "./components/input-form";
import type { SentenceCardType } from "./components/sentence-card-type";

export default function App() {

  const [sentenceCards, setSentenceCards] = useState<SentenceCardType[]>([]);

  const handleAddCard = (newCard: SentenceCardType) => {
    setSentenceCards([newCard, ...sentenceCards]); // 新しいカードを先頭に追加
  };

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
    <main className="max-w-xl mx-auto p-4">
      {/* 追加関数をInputFormに渡す */}
      <InputForm onAddCard={handleAddCard} />

      {/* カード一覧表示 */}
      <div className="mt-6">
        {sentenceCards.map((card, index) => (
          <div key={index} className="bg-gray-50 m-4 p-4 border border-green-600 shadow rounded-lg">
            <button onClick={() => handleEnglishSpeak(card.englishSentence)}>再生</button>
            <h2 className="font-semibold text-lg">{card.englishSentence}</h2>
            <p className="text-gray-600 mt-2">{card.japaneseSentence}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
