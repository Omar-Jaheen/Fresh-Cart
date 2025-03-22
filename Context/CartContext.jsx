import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  const [cartId, setCartId] = useState(0);
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  function addProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        setNumberOfCartItems(res.data.numOfCartItems);
        setCartId(res.data.data._id);
        return res;
      })
      .catch((err) => err);
  }

  function updateCartProductQuantity(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: newCount,
        },

        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function deleteCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function deleteAllCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }





  function checkout(cartId, url, formData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: formData },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getLoggedUserCart,
        updateCartProductQuantity,
        deleteCartItem,
        checkout,
        cartId,
        numberOfCartItems,
        setNumberOfCartItems,
        deleteAllCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
