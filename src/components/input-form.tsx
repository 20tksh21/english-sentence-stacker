export default function InputForm() {
    return (
        <div className="bg-gray-50 m-4 p-6 shadow rounded-lg">
            <label className="font-semibold">英文（本文）</label>
            <textarea
                placeholder="This is a sample sentence."
                className="bg-white w-full mt-2 mb-8 border border-green-600 rounded-sm resize-none"
            ></textarea>
            <label className="font-semibold">和訳</label>
            <textarea
                placeholder="これはサンプルの文章です。"
                className="bg-white w-full mt-2 mb-8 border border-green-600 rounded-sm resize-none"
            ></textarea>

            <button
                className="text-white bg-green-600 p-2 rounded-md shadow hover:bg-green-800"
            >追加する</button>
        </div>
    )
}