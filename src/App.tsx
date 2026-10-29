import { BrowserRouter, Routes, Route } from "react-router-dom"
import CardPage from "./pages/card-page"
import InputPage from "./pages/input-page"
import Header from "./components/Header"
import useCardData from "./components/useCardData"

export default function App() {
  const {
    sentenceCards, 
    allTags,
    handleAddCard, handleDeleteCard
  } = useCardData();

  return(
    <BrowserRouter>

    <Header/>

      <main className="">
        <Routes>
          <Route path="/" element={<CardPage sentenceCards={sentenceCards} allTags={allTags} onDelete={handleDeleteCard} />} />
          <Route path="/input-page" element={<InputPage allTags={allTags} onAddCard={handleAddCard} />} />
        </Routes>
      </main>
    </BrowserRouter>
  )

}


