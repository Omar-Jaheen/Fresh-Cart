import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";
import { jwtDecode } from 'jwt-decode'; 



export default function Login(values) {

 

  let navigate = useNavigate();
  let {userLogin,setUserLogin,userId,setUserId} = useContext(UserContext)
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);


 
  
  
   function handleLogin(values) {
    setisLoading(true);

    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setisLoading(false);
        if (res.data.message == "success") {
          const decodedUser = jwtDecode(res.data.token);

          setUserLogin(res.data.token)
          setUserId(decodedUser.id)

          console.log(userId);
          console.log(userLogin);
          
          console.log(res);
          localStorage.setItem("userId", decodedUser.id );
          localStorage.setItem("userToken", res.data.token);
          
          navigate("/");
        }
      })

      .catch((res) => {
        setisLoading(false);
        // console.log(res.response.data.message);
        setapiError(res.response.data.message);
      });
  }


  const myValidation = yup.object().shape({
    email: yup
      .string()
      .email("Not a valid email")
      .required("The email is required"),

    password: yup
      .string()
      .required("The password is required")
      .min(6, "The minimum length of the password is 6")
      .max(20, "The maximum length of the password is 20"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: myValidation,
    onSubmit: handleLogin,
  });

  return (
    <>
      {apiError ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {apiError}
          
        </div>
      ) : null}

      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-stone-800 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-stone-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div
              class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-stone-800 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-stone-800  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div
              class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
             {formik.errors.password}
            </div>
          ) : null}
        </div>

        <div className="flex gap-5 items-center">
          
          <button
            type="submit"
            className="text-white bg-stone-800 hover:bg-stone-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Submit"}
          </button>

          <Link to={"/register"}>
            {" "}
            <span className="text-blue-600 underline">
              Don't you have an account? register now
            </span>{" "}
          </Link>

 <Link to={"/forgetPassword"}>
            {" "}
            <span className="text-red-600 underline">
              Forget Password ?
            </span>{" "}
          </Link>

        </div>
      </form>
    </>
  );
}
