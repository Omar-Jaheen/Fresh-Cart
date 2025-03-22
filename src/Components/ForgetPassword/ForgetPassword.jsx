import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  

  async function handleForgetPassword(email) {
    setIsLoading(true);
    setApiError("");

    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email }
      );
      console.log(response.data);
      if (response.data.statusMsg == "success") {
        navigate("/verifyCode");
      }
    } catch (error) {
      setApiError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }





  let formik = useFormik({
    initialValues: { email: "" },
    onSubmit: (values) => {
      handleForgetPassword(values.email);
    },
  });

  return (
    <>
      <h1 className="text-3xl text-emerald-600">Forget Password</h1>
      <hr className="my-4" />

      <form className="max-w-md mx-auto my-4" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-stone-800 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-stone-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>

        {apiError && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
            {apiError}
          </div>
        )}

        <button
          type="submit"
          className="btn"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
}
