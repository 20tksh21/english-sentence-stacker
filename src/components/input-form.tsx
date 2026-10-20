import { useState } from "react";
import type { SentenceCardType } from "./sentence-card-type";

//app.tsxから受け取るデータの型
type InputFormProps = {
    onAddCard: (card: SentenceCardType) => void;
};

export default function InputForm({ onAddCard }: InputFormProps) {
    const [englishInput, setEnglishInput] = useState<string>("");
    const [japaneseInput, setJapaneseInput] = useState<string>("");

    const handleAdd = () => {
        if (!englishInput.trim() && !japaneseInput.trim()) return;

        onAddCard({
            englishSentence: englishInput,
            japaneseSentence: japaneseInput,
        });

        setEnglishInput("");
        setJapaneseInput("");
    };

    return (
        <div className="bg-gray-50 m-4 p-6 shadow rounded-lg">
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

            <button
                onClick={handleAdd}
                className="text-white bg-green-600 px-4 py-2 rounded-md shadow hover:bg-green-800"
            >
                追加する
            </button>
        </div>
    );
}
