import React, { useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

export default function ProductDetails() {
  let { id, category } = useParams();

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:2000
  };

  const [product, setProduct] = useState(null);
const [relatedProducts , setRelatedProducts] = useState([]);
  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }


  function getAllProducts(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res) => {
      let relatedProducts = res.data.data.filter((product)=> product.category.name == category)
      setRelatedProducts(relatedProducts)
    })
    .catch((res)=> {
      console.log(res)
    })
  } 

  useEffect(() => {
    getProduct(id);
    getAllProducts();
  }, [id, category]);

  return (
    <>
      <div className="row items-center my-4">
        <div className="w-1/4 p-4 ">
        <Slider {...settings}>
          
          {product?.images.map((src)=> <img src={src} className="w-full object-cover"/>)}
          
           </Slider>
        </div>

        <div className="w-3/4 p-4 text-left ">
        
        <h2 className="font-bold my-10 text-2xl">{product?.title}</h2>

<h3 className="text-gray-700 text-xl">{product?.description}</h3>

<div className="flex justify-between my-4">
  <span className="font-semibold">{product?.price} EGP</span>
  <span>
    <i className="fas fa-star text-amber-400 "></i>
    {product?.ratingsAverage}
  </span>
</div>

<button className="btn">Add To Cart</button>
        
        </div>

       
      </div>


 <div className="row">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <div key={product.id} className="w-1/6 p-4">
              <div className="product p-2">


               <Link to={`/productDetails/${product.id}/${product.category.name}`}> <img src={product.imageCover} className="w-full" alt="" />
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
                </div></Link>

                <button className="btn">Add To Cart</button>
              </div>
            </div>
          ))
        ) : (
          <div className="lds-facebook m-auto  ">
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>

    </>
  );
}
