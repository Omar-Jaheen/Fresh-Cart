import React, { useContext, useEffect, useState } from "react";
import style from "./UserOrders.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";

export default function UserOrders() {
  let { id } = useParams();
  let { userId } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  async function fetchUserOrders() {
    try {
      let res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-emerald-600">Your orders</h1>
      <hr className="my-4" />

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 w-full max-w-screen-xl mx-auto">
        {orders.length > 0 ? (
          orders.map((order) => (
            order.cartItems.map((item) => (
              <div key={item.product._id} className="bg-white rounded-lg shadow-md p-4 text-center flex flex-col items-center">
                <div className="card shadow-sm w-full">
                  <img
                    src={item.product.imageCover}
                    className="card-img-top w-full h-40 object-cover rounded-md"
                    alt={item.product.title}
                  />
                  <div className="card-body">
                    <h1 className="card-title font-bold text-lg">{item.product.title.split(" ").slice(0, 2).join(" ")}</h1>
                    <p className="card-text">Brand: {item.product.brand.name}</p>
                    <p className="card-text">Price: ${item.price}</p>
                    <p className="card-text">Rating: {item.product.ratingsAverage} ⭐</p>
                  </div>
                </div>
              </div>
            ))
          ))
        ) : (
          <div className="col-span-full flex justify-center">
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}