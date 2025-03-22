import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../../Context/wishListContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


export default function Wishlist() {
  let { getLoggedUserWishlist,deleteWishlistItem } = useContext(WishlistContext);

  const [userWishlist, setUserWishlist] = useState([]);

  async function getWishlistItems() {
    let res = await getLoggedUserWishlist();
    console.log(res.data.data);
    if (res.data.status === "success") {
      setUserWishlist(res.data.data);
    }
  }

  async function deleteItem(id) {

    let res = await deleteWishlistItem(id)
    
    if (res.data.status == "success") {
        console.log(res.data.data);
        setUserWishlist(res.data.data);
        
        toast.success("product removed successfully");
      } else {
        toast.error("Error, can not remove this item");
      }
  }

  useEffect(() => {
    getWishlistItems();
  }, []);

  return (
    <>

      {userWishlist?.length > 0 ? (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">Product</th>
                  
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {userWishlist.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.imageCover } image
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.title}
                    </td>
                   
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                        onClick={()=> deleteItem(product._id)}
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
          There are no items to show
        </h1>
      )}

      <Link to="/checkout">
        <button className="btn cursor-pointer my-5">Checkout</button>
      </Link>
    </>
  );
}
