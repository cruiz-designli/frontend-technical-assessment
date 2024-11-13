import { ProductList, Filters } from "../components";

const Home = () => {
  return (
    <div className="space-y-6">
      <Filters />
      <ProductList />
    </div>
  );
};

export default Home;
