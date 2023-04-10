import './Styles/style.scss'
import MainPage from "./Components/MainPage/MainPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CardRep from './Components/CardRep/CardRep';
const App = () => {

  return(
    // <div>
    //   <MainPage/>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/> }></Route>
        <Route path="/repository/:repositoryName/:id" element={<CardRep/> }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
