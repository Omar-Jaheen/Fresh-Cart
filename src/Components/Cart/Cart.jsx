import React, { useContext, useState, useEffect } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getLoggedUserCart,
    updateCartProductQuantity,
    deleteCartItem,
    NumberOfCartItems,
    setNumberOfCartItems,
    deleteAllCart,
  } = useContext(CartContext);
  
  const [cartDetails, setCartDetails] = useState(null);
  
  async function getCartItems() {
    let response = await getLoggedUserCart();
    console.log(response.data.data);

    if (response.data.status == "success") {
      setCartDetails(response.data.data);
    }
  }

  async function updateProduct(id, count) {
    if (count == 0) {
      deleteItem(id);
    } else {
      let response = await updateCartProductQuantity(id, count);
      console.log(response.data.data);

      if (response.data.status == "success") {
        setCartDetails(response.data.data);
        toast.success("product uptated successfully");
      } else {
        toast.error("error");
      }
    }
  }

  async function deleteItem(productId) {
    let response = await deleteCartItem(productId);
    console.log(response.data.data);

    if (response.data.status == "success") {
      console.log(response);
      setNumberOfCartItems(NumberOfCartItems - 1);
      setCartDetails(response.data.data);
      toast.success("product removed successfully");
    } else {
      toast.error("Error, can not remove this item");
    }
  }

  async function deleteCart() {
    let response = await deleteAllCart();
    // console.log(response.data);
    

    if (response.data.message == "success") {
      console.log(response);
      
      setCartDetails(response.data);
      toast.success("Cart cleared successfully");
    } else {
      toast.error("Error, can not clear cart");
    }
  }

  useEffect(() => {
    getCartItems();
    console.log(cartDetails);
    
  }, []);

  return (
    <>
      {cartDetails?.products.length > 0 ? (
        <>
          {" "}
          <h2 className="text-center my-6 text-2xl capitalize text-red-600 font-bold">
            Total price : {cartDetails?.totalCartPrice}
          </h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails?.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt=""
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateProduct(product.product.id, product.count - 1)
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <span>{product.count}</span>
                        </div>
                        <button
                          onClick={() =>
                            updateProduct(product.product.id, product.count + 1)
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => deleteItem(product.product.id)}
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h1 className="text-3xl font-bold text-center text-emerald-700 my-10">
          There is no items to show
        </h1>
      )}


<div className="flex justify-around my-4">
      <Link className="w-1/3" to="/checkout">
     
      <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 cursor-pointer w-full">Checkout</button>
      </Link>

      <button onClick={()=>deleteCart()} type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 w-1/3 cursor-pointer">Clear Cart</button>
      </div>

    </>
  );
}
