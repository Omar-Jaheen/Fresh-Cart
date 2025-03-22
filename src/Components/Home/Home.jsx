import React from "react";
import RecentProducts from './../RecentProducts/RecentProducts.jsx';
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider.jsx";
import MainSlider from './../MainSlider/MainSlider.jsx';


export default function Home(){
    return <>
    <MainSlider/>
    <CategoriesSlider/>
    <RecentProducts/>

    </>
}