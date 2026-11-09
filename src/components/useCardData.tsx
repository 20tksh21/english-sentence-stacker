import { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabase";
import type { SentenceCardType } from "./sentence-card-type";
import { useAuth } from "../contexts/AuthContext";

export default function useCardData() {
    // ログイン中のユーザー情報を取得
    const { user } = useAuth();
    const [sentenceCards, setSentenceCards] = useState<SentenceCardType[]>([]);


    useEffect(() => {
        // 未ログイン時はカードを空にして取得を行わない
        if (!user) {
            setSentenceCards([]);
            return;
        }

        const currentUserId = user.id;

        async function fetchData() {
            const { data, error } = await supabase
                .from('sentence-card')
                .select('*')
                .eq('user_id', currentUserId)
            
            if (error) {
                console.error('データ取得エラー:', error)
            } else {
                setSentenceCards(data || [])
            }
        }
        fetchData()
    }, [user]) // ユーザーログイン状態の変化に応じて再実行

    //既存のカードからタグを重複なしで取得して配列に格納
    const allTags: string[] = useMemo(() => {
        return Array.from(new Set(sentenceCards.flatMap((card) => card.tags)));
    }, [sentenceCards]);


    async function handleAddCard(newCard: SentenceCardType) {
        // ログイン中のユーザーIDをカード情報に付加
        const cardToInsert = {
            ...newCard,
            user_id: user?.id,
        };

        const { error } = await supabase.from('sentence-card').insert([cardToInsert])

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
