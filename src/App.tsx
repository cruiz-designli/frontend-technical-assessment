import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Detail, Home } from "./pages";
import Layout from "./components/Layout";
import { ProductsProvider } from "./context/ProductsContext";
import { ROUTES } from "./constants";

import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path={ROUTES.HOME}
            element={
              <ProductsProvider>
                <Home />
              </ProductsProvider>
            }
          />
          <Route path={ROUTES.PRODUCT_DETAIL} element={<Detail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
