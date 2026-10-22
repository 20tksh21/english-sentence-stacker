import { useState } from "react";
import InputForm from "./components/input-form";
import type { SentenceCardType } from "./components/sentence-card-type";
import SentenceCard from "./components/sentence-card";

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
          <SentenceCard
            key={index}
            card={card}
            onDelete={handleDeleteCard}
            onSpeak={handleEnglishSpeak}
          />
        ))}
      </div>
    </main>
  );
}


