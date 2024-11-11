import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Detail, Home } from "./pages";
import { ROUTES } from "./constants";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.PRODUCT_DETAIL} element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
