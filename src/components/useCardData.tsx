import { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabase";
import type { SentenceCardType } from "./sentence-card-type";

export default function useCardData() {

    const [sentenceCards, setSentenceCards] = useState<SentenceCardType[]>([]);


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
    const allTags: string[] = useMemo(() => {
        return Array.from(new Set(sentenceCards.flatMap((card) => card.tags)));
    }, [sentenceCards]);


    async function handleAddCard(newCard: SentenceCardType) {
        const { error } = await supabase.from('sentence-card').insert([newCard])

        if(error){
            console.error("保存失敗", error);
            return;
        }

        setSentenceCards([...sentenceCards, newCard]);
    };

    async function handleDeleteCard(targetCard: SentenceCardType) {
        const { error } = await supabase.from('sentence-card').delete().eq('id', targetCard.id)
        if(error){
            console.error("削除失敗", error);
            return;
        }
        
        setSentenceCards(sentenceCards.filter((card) => card.id !== targetCard.id))
    }

    async function handleUpdateCard(updatedCard: SentenceCardType) {
        const { error } = await supabase
            .from('sentence-card')
            .update({
                english_sentence: updatedCard.english_sentence,
                japanese_sentence: updatedCard.japanese_sentence,
                tags: updatedCard.tags
            })
            .eq('id', updatedCard.id)

        if(error) {
            console.error('更新失敗', error);
        }

        setSentenceCards(sentenceCards.map((card) => card.id === updatedCard.id ? updatedCard : card));
    }


    return {
        sentenceCards, setSentenceCards,
        allTags,
        handleAddCard, handleDeleteCard, handleUpdateCard
    }
}