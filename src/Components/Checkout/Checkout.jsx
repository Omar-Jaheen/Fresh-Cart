import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { CartContext } from "../../../Context/CartContext"; 

export default function Checkout() {  
  let { checkout,cartId } = useContext(CartContext);


  async function handleCheckout(cartId, url) {
    let {data} = await checkout(cartId, url, formik.values);
    console.log(data.session.url);
    window.location.href = data.session.url
    
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: () => {
      handleCheckout(cartId, `http://localhost:5173`);
    },
  });

  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <h1 className="text-stone-800 text-3xl font-bold">Checkout Now</h1>
      <hr className="my-8" />
      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-stone-800 peer"
            placeholder=" "
            required
          />
          <label htmlFor="details" className="peer-focus:font-medium absolute left-0 text-sm text-gray-500">
            Details
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-stone-800 peer"
            placeholder=" "
            required
          />
          <label htmlFor="phone" className="peer-focus:font-medium absolute left-0 text-sm text-gray-500">
            Phone
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-stone-800 peer"
            placeholder=" "
            required
          />
          <label htmlFor="city" className="peer-focus:font-medium absolute left-0 text-sm text-gray-500">
            City
          </label>
        </div>

        <button type="submit" className="text-white bg-stone-800 hover:bg-stone-950 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Checkout"}
        </button>
      </form>
    </>
  );
}
