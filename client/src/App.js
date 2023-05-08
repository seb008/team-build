import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Affaire from "./pages/affaire/Affaire.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/affaire" element={<Affaire />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
