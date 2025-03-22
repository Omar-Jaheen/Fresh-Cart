import React from "react";
import { Outlet } from "react-router-dom";
import style from "./Layout.module.css";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container my-5 py-20 lg:py-12">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
