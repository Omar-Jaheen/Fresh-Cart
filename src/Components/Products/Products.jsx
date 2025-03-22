import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext";
import { WishlistContext } from "../../../Context/wishListContext";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0);

  const { addProductToCart, setNumberOfCartItems, numberOfCartItems } =
    useContext(CartContext);
  const { addProductToWishlist, deleteWishlistItem, getLoggedUserWishlist } =
    useContext(WishlistContext);

  const [wishlist, setWishlist] = useState(new Set());

  // Sync local wishlist state with global context
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await getLoggedUserWishlist();
        if (response.data.status === "success") {
          setWishlist(new Set(response.data.data.map((item) => item.id)));
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    }

    fetchWishlist();
  }, [getLoggedUserWishlist]);

  // Fetch Products
  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Toggle Wishlist Function
  async function toggleWishlist(id) {
    if (wishlist.has(id)) {
      let response = await deleteWishlistItem(id);
      if (response.data.status === "success") {
        toast.success("Removed from wishlist");
        setWishlist((prevWishlist) => {
          const newWishlist = new Set(prevWishlist);
          newWishlist.delete(id);
          return newWishlist;
        });
      } else {
        toast.error("Error removing item from wishlist");
      }
    } else {
      let response = await addProductToWishlist(id);
      if (response.data.status === "success") {
        toast.success("Added to wishlist");
        setWishlist((prevWishlist) => {
          const newWishlist = new Set(prevWishlist);
          newWishlist.add(id);
          return newWishlist;
        });
      } else {
        toast.error("Error adding item to wishlist");
      }
    }
  }

  // Add to Cart
  async function addToCart(id) {
    setCurrentProductId(id);
    setLoading(true);
    let response = await addProductToCart(id);

    if (response.data.status === "success") {
      setLoading(false);
      setNumberOfCartItems(numberOfCartItems + 1);
      toast.success("Added to cart");
    } else {
      setLoading(false);
      toast.error("Error adding item to cart");
    }
  }

 return (
<>
  <h2 className="text-3xl font-bold text-center text-emerald-600">All Products</h2>
       <hr className="my-4" />
  
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
       
       {products.length > 0 ? (
         products.map((product) => (
           <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
             <Link to={`/productDetails/${product.id}/${product.category.name}`}>
               <img
                 src={product.imageCover}
                 className="w-full h-40 object-cover rounded-md"
                 alt={product.title}
               />
               <h3 className="text-green-500 mt-2">{product.category.name}</h3>
               <h3 className="font-semibold text-lg mb-2">
                 {product.title.split(" ").slice(0, 2).join(" ")}
               </h3>
 
               <div className="flex justify-between items-center text-gray-700 text-sm">
                 <span className="font-medium">{product.price} EGP</span>
                 <span className="flex items-center gap-1">
                   <i className="fas fa-star text-amber-400"></i>
                   {product.ratingsAverage}
                 </span>
               </div>
             </Link>
 
             <div className="flex items-center justify-between mt-3">
               <button
                 onClick={() => addToCart(product.id)}
                 className="bg-emerald-600 text-white py-1 px-3 rounded-lg hover:bg-emerald-700 transition duration-200 flex items-center justify-center"
               >
                 {loading && currentProductId === product.id ? (
                   <i className="fas fa-spinner fa-spin"></i>
                 ) : (
                   "Add to cart"
                 )}
               </button>
 
               <FaHeart
                 onClick={() => toggleWishlist(product.id)}
                 className={`text-2xl cursor-pointer transition duration-200 ${
                   wishlist.has(product.id) ? "text-red-500" : "text-gray-400"
                 }`}
               />
             </div>
           </div>
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
