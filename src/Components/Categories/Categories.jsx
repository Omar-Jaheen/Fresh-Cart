import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "./Categories.module.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
<h2 className="text-3xl font-bold text-center text-emerald-600">All Categories</h2>
<hr className="my-4" />


      <div className="row">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category._id} className="w-1/6 p-4">
              <div className="category p-2 text-center">
                <Link to={`/categoryDetails/${category._id}`}>
                  <img src={category.image} className="w-full" alt={category.name} />
                  <h3 className="font-semibold mt-2">{category.name}</h3>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="lds-facebook m-auto">
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
    </>
  );
}