import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function CategoryDetails() {
  let { id } = useParams();
  const [category, setCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  function getCategoryDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching category details:", error);
      });
  }

  function getCategoryProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let filteredProducts = res.data.data.filter(
          (product) => product.category._id === id
        );
        setCategoryProducts(filteredProducts);
      })
      .catch((error) => {
        console.error("Error fetching category products:", error);
      })
      .finally(() => {
        setLoading(false); 
      });
  }

  useEffect(() => {
    setLoading(true); 
    getCategoryDetails(id);
    getCategoryProducts();
  }, [id]);

  return (
    <>
      <div className="container my-4">
        {category ? (
          <div className="text-center w-[150px] mx-auto m-6">
            <img src={category.image} alt={category.name} className="w-full " />
            <h2 className="text-xl font-bold mt-4">{category.name}</h2>
            <hr />
          </div>
        ) : (
          <div className="lds-facebook m-auto">
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>

      <div className="row">
        {loading ? (
          <div className="lds-facebook m-auto">
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : categoryProducts.length > 0 ? (
          categoryProducts.map((product) => (
            <div key={product.id} className="w-1/6 p-4">
              <div className="product p-2">
                <Link to={`/productDetails/${product.id}/${product.category.name}`}>
                  <img src={product.imageCover} className="w-full" alt={product.title} />
                  <h3 className="text-green-500">{product.category.name}</h3>
                  <h3 className="font-semibold mb-3">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star text-amber-400 "></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button className="btn">Add To Cart</button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center w-full py-6">
            <p className="text-lg text-gray-500">No products available in this category right now.</p>
          </div>
        )}
      </div>
    </>
  );
}
