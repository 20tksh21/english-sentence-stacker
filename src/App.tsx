import { useState, useEffect, useMemo } from "react";
import { supabase } from "./lib/supabase";
import InputForm from "./components/input-form";
import type { SentenceCardType } from "./components/sentence-card-type";
import SentenceCard from "./components/sentence-card";
import TagBadges from "./components/tag-badges";
import { Tag } from "lucide-react";
import Header from "./components/Header";

export default function App() {

  const [sentenceCards, setSentenceCards] = useState<SentenceCardType[]>([]);
  const [searchSelectedTag, setSearchSelectedTag] = useState<string[]>([]);

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

  const filteredCards = useMemo(() => {
    if (searchSelectedTag.length === 0) return sentenceCards;

    // 選択されたすべてのタグを網羅しているカードだけに絞り込む(AND検索)
    return sentenceCards.filter((card) => 
      card.tags && searchSelectedTag.every((tag) => card.tags.includes(tag))
    );
  }, [sentenceCards, searchSelectedTag]);



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

  const handleSearchTagSelect = (tag: string) => {
    if (!searchSelectedTag.includes(tag)) {
      setSearchSelectedTag([...searchSelectedTag, tag]);
    } else {
      setSearchSelectedTag(searchSelectedTag.filter((t) => t !== tag));
    }
  }

  return (
    <main>
      <Header pageTitle="カード一覧"/>
      <div className="text-gray-700 max-w-xl mx-auto p-4">


        {/* 追加関数をInputFormに渡す */}
        <InputForm onAddCard={handleAddCard} allTags={allTags} />

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
          {filteredCards.map((card, index) => (
            <SentenceCard
              key={index}
              card={card}
              onDelete={handleDeleteCard}
              onSpeak={handleEnglishSpeak}
            />
          ))}
        </div>
      </div>
    </main>

  );
}


