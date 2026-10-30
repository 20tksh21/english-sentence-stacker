import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { SentenceCardType } from "../components/sentence-card-type";
import TagBadges from "../components/tag-badges";

//app.tsxから受け取るデータの型
type InputPageProps = {
    allCards: SentenceCardType[];
    onAddCard: (card: SentenceCardType) => void;
    onDeleteCard: (card: SentenceCardType) => void;
    onUpdateCard: (card: SentenceCardType) => void;
    allTags: string[];
};

export default function InputPage({allCards, onAddCard, onDeleteCard, onUpdateCard, allTags }: InputPageProps) {

    //URLにidがあったら編集モード
    const { id } = useParams();
    const isEdit = id !== undefined;
    const targetCard = allCards.find((card) => card.id === id)

    const [englishInput, setEnglishInput] = useState<string>(targetCard ? targetCard.english_sentence : "");
    const [japaneseInput, setJapaneseInput] = useState<string>(targetCard ? targetCard.japanese_sentence : "");

    const [selectedTags, setSelectedTags] = useState<string[]>(targetCard ? targetCard.tags : []);
    const [tagInput, setTagInput] = useState<string>("");

    const navigate = useNavigate();

    //表示用の既存タグ＋追加したタグ    
    const displayTags: string[] = Array.from(new Set([...allTags, ...selectedTags]));

    const handleSave = () => {
        if (!englishInput.trim() && !japaneseInput.trim()) return;

        if (isEdit && targetCard) {
            // 編集モードのとき→更新用関数を呼ぶ
            onUpdateCard({
                id: targetCard.id, // 既存のIDをそのまま引き継ぐ
                english_sentence: englishInput,
                japanese_sentence: japaneseInput,
                tags: selectedTags
            });
        } else {
            // 新規作成のとき→追加用関数を呼ぶ
            onAddCard({
                id: crypto.randomUUID(),
                english_sentence: englishInput,
                japanese_sentence: japaneseInput,
                tags: selectedTags
            });
        }

        navigate('/');
    }

    const handleDeleteCard = (card: SentenceCardType) => {
        onDeleteCard(card);
        navigate('/');
    }

    const handleInputTagSelect = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    }

    const handleAddTag = () => {
        if(!tagInput) return;
        if(!selectedTags.includes(tagInput)) {
            setSelectedTags([...selectedTags, tagInput.trim()]);
            setTagInput("");
        }
    }

    return (
        <div className="bg-white h-screen">
            <div className="p-6">
                <label className="font-semibold">英文（本文）</label>
                <textarea
                    onChange={(e) => setEnglishInput(e.target.value)}
                    value={englishInput}
                    placeholder="This is a sample sentence."
                    className="bg-white w-full mt-2 mb-4 p-2 border border-green-600 rounded-sm resize-none"
                ></textarea>

                <label className="font-semibold">和訳</label>
                <textarea
                    onChange={(e) => setJapaneseInput(e.target.value)}
                    value={japaneseInput}
                    placeholder="これはサンプルの文章です。"
                    className="bg-white w-full mt-2 mb-6 p-2 border border-green-600 rounded-sm resize-none"
                ></textarea>


                {/*既存のタグ一覧 */}
                <p className="mt-6">タグ一覧</p>
                <TagBadges
                    tags={displayTags}
                    selectedTags={selectedTags} 
                    onTagClick={handleInputTagSelect}
                />

                {/*タグ入力フォーム */}
                <input
                    type="text"
                    onChange={(e) => setTagInput(e.target.value)}
                    value={tagInput}
                    placeholder="新しいタグ名を入力..."
                    className="bg-white w-full mt-2  p-2 border border-green-600 rounded-sm"
                />

                {/*タグ追加ボタン */}
                <button
                    onClick={handleAddTag}
                    className="text-white bg-green-600 px-4 py-2 my-6 rounded-md shadow hover:bg-green-800"
                >
                    タグを追加
                </button>

                <br/>

                <div className="flex w-full justify-between">
                    {/*カード追加ボタン */}
                    <button
                        onClick={handleSave}
                        className="text-white bg-green-600 px-4 py-2 rounded-md shadow hover:bg-green-800"
                    >
                        {isEdit ? "保存" : "追加"}
                    </button>

                    {/*削除ボタン */}
                    {isEdit && (
                        <button
                            onClick={() => handleDeleteCard(targetCard!)}
                            className="text-white bg-red-500 px-4 py-2 rounded-md shadow hover:bg-red-800"
                        >
                            削除
                        </button>

                    )}
                </div>

            </div>

        </div>
    );
}
