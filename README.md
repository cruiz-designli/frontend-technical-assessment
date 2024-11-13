# Vite React E-Commerce Project

This project is an e-commerce platform built with React and Vite. It integrates with the [Fake API](https://fakeapi.platzi.com/en/rest/swagger/) to simulate real-world e-commerce functionality, including product listing, filtering, and pagination. The app is designed to provide a smooth user experience with dynamic content and modern front-end technologies.

### Key Instructions:

- **Creating the project**: `npm create vite` or `yarn create vite` with the React template.
- **Installing dependencies**: `npm install` or `yarn` to install the required packages.
- **Running the development server**: `npm run dev` or `yarn dev` to start the local server usually at `http://localhost:3000`.

This provides the essential steps to get your Vite React project up and running.

### Key Additions:

- **Installed Dependencies**: A section that details the libraries installed:
  - **Tailwind CSS** for styling.
  - **Heroicons** for icons.
  - **React Range** for range sliders.
  - **Vitest** for testing.

### State Management

In this project, most of the app's state is managed through query parameters to enhance filtering and provide better flexibility across different views of the app. This allows users to filter products, adjust settings, and navigate through various pages, with the filtering state being reflected in the URL itself.

Query Parameters: Used for managing states like pagination, filters, and search queries.
Context Provider: The ProductsContext is used along the Home page to provide the list of products across child components. This context allows sharing the product data between components like ProductList and Filters, ensuring a smooth user experience when managing state related to products.
