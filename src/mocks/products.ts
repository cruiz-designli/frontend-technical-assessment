import { Product } from "../types/products";

const product: Product = {
  id: 1,
  title: "Sample Product",
  description: "This is a sample product.",
  price: 99.99,
  images: ["https://example.com/image.jpg"],
  category: {
    id: 1,
    name: "Sample Category",
    image: "https://example.com/image.jpg",
    creationAt: "2022-02-02T00:00:00.000Z",
    updatedAt: "2022-02-02T00:00:00.000Z",
  },
  creationAt: "2022-02-02T00:00:00.000Z",
  updatedAt: "2022-02-02T00:00:00.000Z",
};

export { product };
