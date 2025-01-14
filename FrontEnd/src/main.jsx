import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import Layout from "./Components/Layout.jsx";
import ClientPage from "./Pages/ClientPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import "./index.css";
import Cart from "./Pages/Cart/Index.jsx";
import LoginOrSignUp from "./Pages/LoginOrSignUp/Index.jsx";
import SingleProductPage from "./Pages/SinglePrd/index.jsx";
import Waitlist from "./Pages/Waitlist.jsx";
import Product from "./Pages/Product/index.jsx";
import Login from "./Pages/LoginIn/index.jsx";
import SignUp from "./Pages/SignUP/index.jsx";
import Wishlist from "./Pages/Wishlist/index.jsx";

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
      <Route path="/wishlist" element={<Wishlist />} />
      <Route
        path="/products/:gender/:description/:id"
        element={<SingleProductPage />}
      ></Route>
      <Route path="/login" element={<LoginOrSignUp />} />
      <Route path="/login-in" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/product" element={<Product />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
