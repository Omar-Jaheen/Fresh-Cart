// import axios from "axios";
// import { createContext, useState } from "react";
// import { Navigate } from "react-router-dom";

// export let ForgetPasswordContext = createContext();

// export default function ForgetPasswordContextProvider(props) {
  

//    function handleForgetPassword(email) {
//     setisLoading(true);

//     return axios
//       .post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
        
//       },)

//       .then((res) => {
//         Navigate("/verifyCode")
//       })
//       .catch((err) => err);

//     //   .then((res) => {
//     //     setisLoading(false);
//     //     if (res.data.message == "success") {
         
//     //       navigate("/verfyCode");
//     //     }
//     //   })

//     //   .catch((res) => {
//     //     setisLoading(false);
//     //     // console.log(res.response.data.message);
//     //     setapiError(res.response.data.message);
//     //   });
//   }

  
//   return (
//     <ForgetPasswordContext.Provider
//       value={{
//         handleForgetPassword,
//       }}
//     >
//       {props.children}
//     </ForgetPasswordContext.Provider>
//   );
// }
