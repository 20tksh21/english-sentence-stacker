import { useState, useEffect, useMemo } from "react";
import { supabase } from "./lib/supabase";
import InputForm from "./components/input-form";
import type { SentenceCardType } from "./components/sentence-card-type";
import SentenceCard from "./components/sentence-card";

export default function App() {

  const [sentenceCards, setSentenceCards] = useState<SentenceCardType[]>([
  ]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('sentence-card').select('*')
      
      if (error) {
        console.error('データ取得エラー:', error)
      } else {
        setSentenceCards(data || [])
      }
    }
    fetchData()
  }, [])

  //既存のカードからタグを重複なしで取得して配列に格納
  const allTags = useMemo(() => {
    return Array.from(new Set(sentenceCards.flatMap((card) => card.tags)));
  }, [sentenceCards]);

  async function handleAddCard(newCard: SentenceCardType) {
    const { error } = await supabase.from('sentence-card').insert([newCard])

      if(error){
        console.error("保存失敗", error);
      }

      setSentenceCards([...sentenceCards, newCard]);
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
      <InputForm onAddCard={handleAddCard} allTags={allTags} />

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


