import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Layout from "./Components/Layout.jsx";
import HomePage from "./Pages/HomePage.jsx";
import ClientPage from "./Pages/ClientPage.jsx";
import Cart from "./Pages/Cart.jsx";
// import SingleProductPage from "./Pages/SingleProductPage.jsx";
import SingleProductPage from "./Pages/SinglePrd/index.jsx";
import Waitlist from "./Pages/Waitlist.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<HomePage />} />
      <Route path="/products/:category" element={<ClientPage />}></Route>
      <Route
        path="/products/:category/:description"
        element={<ClientPage />}
      ></Route>
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Waitlist />} />
      <Route
        path="/products/:gender/:description/:id"
        element={<SingleProductPage />}
      ></Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
