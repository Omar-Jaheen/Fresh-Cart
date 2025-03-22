import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Notfound from "./Components/Notfound/Notfound";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart.jsx";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import { RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import UserContextProvider from "../Context/UserContext";
import ProtectedRoute from "./../ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import BrandDetails from "./Components/BrandDetails/BrandDetails";
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "../Context/CartContext.jsx";
import Checkout from "./Components/Checkout/Checkout";
import WishlistContextProvider from "../Context/wishListContext.jsx";
import Wishlist from "./Components/WishList/WishList.jsx";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword.jsx";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import UserOrders from "./Components/UserOrders/UserOrders.jsx";

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "brandDetails/:id",
        element: (
          <ProtectedRoute>
            <BrandDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "categoryDetails/:id",
        element: (
          <ProtectedRoute>
            <CategoryDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },

      {
        path: "userOrders/:id",
        element: (
          <ProtectedRoute>
            <UserOrders />
          </ProtectedRoute>
        ),
      },

      { path: "register", element: <Register /> },
      { path: "forgetPassword", element: <ForgetPassword /> },
      { path: "verifyCode", element: <VerifyCode /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <RouterProvider router={x}></RouterProvider>
        </WishlistContextProvider>
      </CartContextProvider>
      <Toaster />
    </UserContextProvider>
  );
}

export default App;
