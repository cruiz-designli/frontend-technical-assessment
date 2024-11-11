import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Detail, Home } from "./pages";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
