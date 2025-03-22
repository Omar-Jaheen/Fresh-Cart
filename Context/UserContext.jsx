import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props){

  const [userLogin,setUserLogin] =  useState(localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null )

  const [userId,setUserId] =  useState(localStorage.getItem("userId"))
  


    return <UserContext.Provider value={  {userLogin,setUserLogin,userId,setUserId}  }>

{props.children}

    </UserContext.Provider>


}