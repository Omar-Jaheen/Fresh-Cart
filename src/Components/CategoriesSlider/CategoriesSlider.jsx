import React, { useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css"
import axios from "axios";
import Categories from './../Categories/Categories';
import Slider from "react-slick";

export default function CategoriesSlider(){

const [categories, setCategories] = useState([])

var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:2000
  };

function getCategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
        // console.log(res.data.data);
        setCategories(res.data.data);

    })
}

useEffect(()=>{
    getCategories()
},[])

    return <>
    
    <Slider {...settings}>
        {categories.map((category)=> <div key={category._id}>
            
            <img src={category.image} alt="" className="w-full h-[200px] object-cover"/>
            <h4>{category.name}</h4>
            </div>)}
    </Slider>
    </>
}