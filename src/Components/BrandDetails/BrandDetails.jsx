import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BrandDetails() {
  let { id } = useParams();
  console.log(id)
  const [brand, setBrand] = useState([]);

  function getBrandDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((res) => {
        setBrand(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching brand details:", error);
      });
  }

  useEffect(() => {
    getBrandDetails(id);
  }, [id]);

  return (
    <>

    <h1>brand details</h1>
      <div className="container my-4">
        {brand ? (
          <div className="text-center">
            <img src={brand.image} alt={brand.name} className="w-1/4 mx-auto" />
            <h2 className="text-2xl font-bold mt-4">{brand.name}</h2>
            
          </div>
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
