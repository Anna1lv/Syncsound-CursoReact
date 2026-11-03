import { useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import TrackDetail from "./pages/TrackDetail";
import Header from "./components/Header";


const App = () => {
  

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/track/:id" element={<TrackDetail />} />
      </Routes>
    </>
  )
}

export default App;
