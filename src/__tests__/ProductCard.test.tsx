import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ProductCard } from "../components";
import { product } from "../mocks/products";
import placeholderImage from "../assets/placeholder-image.jpg";

describe("ProductCard", () => {
  it("renders product title, description, price, and category", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    expect(screen.getByText(product.category.name)).toBeInTheDocument();
  });

  it("displays the main image", () => {
    render(<ProductCard product={product} />);
    const img = screen.getByRole("img", { name: product.title });
    expect(img).toHaveAttribute("src", product.images[0]);
  });

  it("fallbacks to a placeholder image if main image fails to load", () => {
    render(<ProductCard product={product} />);
    const img = screen.getByRole("img", { name: product.title });

    img.dispatchEvent(new Event("error"));

    expect(img).toHaveAttribute("src", placeholderImage);
  });
});
