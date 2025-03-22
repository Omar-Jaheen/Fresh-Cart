import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "./Brands.module.css";

export default function Brands() {
  const [brands, setBrands] = useState([]);

  function getBrands() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then((res) => {
        setBrands(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-emerald-600">All brands</h2>
      <hr className="my-4" />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {brands.length > 0 ? (
          brands.map((brand) => (
            <div key={brand._id} className="bg-white rounded-lg shadow-md p-4 text-center">
              <Link to={`/brandDetails/${brand._id}`}>
                <img src={brand.image} className="w-full h-40 object-cover rounded-md" alt={brand.name} />
                <h3 className="font-semibold mt-2">{brand.name}</h3>
              </Link>
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
