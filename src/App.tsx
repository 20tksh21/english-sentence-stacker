import { useState } from "react";
import InputForm from "./components/input-form";
import type { SentenceCardType } from "./components/sentence-card-type";

export default function App() {

  const [sentenceCards, setSentenceCards] = useState<SentenceCardType[]>([]);

  const handleAddCard = (newCard: SentenceCardType) => {
    setSentenceCards([newCard, ...sentenceCards]); // 新しいカードを先頭に追加
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      {/* 追加関数をInputFormに渡す */}
      <InputForm onAddCard={handleAddCard} />

      {/* カード一覧表示 */}
      <div className="mt-6">
        {sentenceCards.map((card, index) => (
          <div key={index} className="bg-gray-50 m-4 p-4 border border-green-600 shadow rounded-lg">
            <h2 className="font-semibold text-lg">{card.englishSentence}</h2>
            <p className="text-gray-600 mt-2">{card.japaneseSentence}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
