import { BrowserRouter, Routes, Route } from "react-router-dom"
import CardPage from "./pages/card-page"
import InputPage from "./pages/input-page"
import Header from "./components/Header"
import useCardData from "./components/useCardData"

export default function App() {
  const {
    sentenceCards, 
    allTags,
    handleAddCard, handleDeleteCard, handleUpdateCard
  } = useCardData();

  return(
    <BrowserRouter>

    <Header/>

      <main className="">
        <Routes>
          <Route path="/" element={<CardPage sentenceCards={sentenceCards} allTags={allTags}/>} />
          <Route
            path="/input-page"
            element={<InputPage allCards={sentenceCards} allTags={allTags} onAddCard={handleAddCard} onDeleteCard={handleDeleteCard} onUpdateCard={handleUpdateCard}/>} />
          <Route
            path="/edit-page/:id" 
            element={<InputPage allCards={sentenceCards} allTags={allTags} onAddCard={handleAddCard} onDeleteCard={handleDeleteCard} onUpdateCard={handleUpdateCard}/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )

}


