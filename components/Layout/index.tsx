import Navigation from '../Navigation'
import Sidebar from '../Sidebar'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react";


export default function Layout({ children }: any) {
  const router = useRouter()
  const curentRoute = router.pathname;

  useEffect(() => {
    
  }, []);


  if( curentRoute == "/login" || curentRoute == "/register" ){
    return (
      <>
        <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <ToastContainer />
          <div className="px-6 pt-6 2xl:container">
          {children}
          </div>
        </div>
      </>
    )
  }else{
    return (
      <>
        <Sidebar />
        <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <Navigation />
          <ToastContainer />
          <div className="px-6 pt-6 2xl:container">
          {children}
          </div>
        </div>
      </>
    )
  }

  
}
