import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";

export default function Register(values) {
  let navigate = useNavigate();
let {userLogin,setUserLogin} = useContext(UserContext)
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  function handleRegister(values) {
    setisLoading(true)
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        setisLoading(false)
       localStorage.setItem("userToken", res.data.token)
       setUserLogin(res.data.token)
       
       navigate("/")
      })
      .catch((res) => {
        setisLoading(false)
        // console.log(res.response.data.message);
        setapiError(res.response.data.message)
      });
  }

  // async function handleRegister(values) {
  //   console.log(values);

  //   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values )
  //   console.log(data);

  //   if (data.message == "success"){

  //     navigate("/home")

  //   }

  //     else{

  //       //show error
  //     }

  // }

  const myValidation = yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Za-z\s]+$/, "The name must contain only letters and spaces")
      .min(3, "Minimum length of the name is 3")
      .max(15, "Maximum length of the name is 15")
      .required("The name is required"),

    email: yup
      .string()
      .email("Not a valid email")
      .required("The email is required"),

    password: yup
      .string()
      .required("The password is required")
      .min(6, "The minimum length of the password is 6")
      .max(20, "The maximum length of the password is 20"),

    rePassword: yup
      .string()
      .required("The re-entered password is required")
      .oneOf([yup.ref("password")], "Passwords do not match"),

    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "Phone number is not valid")
      .required("The phone number is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: myValidation,
    onSubmit: handleRegister,
  });

  return (
    <>
      {apiError ? (
        <div
          className="p-4 mb-4 text-sm text-white font-bold rounded-lg bg-red-600"
          role="alert"
        >
          {apiError}
          
        </div>
      ) : null}

      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-stone-800 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-stone-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your name{" "}
          </label>

          {formik.errors.name && formik.touched.name ? (
            <div
              class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
             <span>{formik.errors.name}</span> 
            </div>
          ) : null}
        </div>

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
             <span>{formik.errors.email}</span>
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
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-stone-800 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-stone-800  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            rePassword
          </label>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              <span>{formik.errors.rePassword}</span>
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-stone-800 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-stone-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your phone number{" "}
          </label>
          {formik.errors.phone && formik.touched.phone ? (
            <div
              class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              <span>{formik.errors.phone}</span>
            </div>
          ) : null}
        </div>
        <div className="flex gap-5 items-center">
          <div className="grid md:grid-cols-2 md:gap-6"></div>
          <div className="grid md:grid-cols-2 md:gap-6"></div>
          <button
            type="submit"
            className="text-white bg-stone-800 hover:bg-stone-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Submit"}
          </button>

          <Link to={"/login"}>
            {" "}
            <span className="text-blue-600 underline">
              Do you have an account? login now
            </span>{" "}
          </Link>
        </div>
      </form>
    </>
  );
}
