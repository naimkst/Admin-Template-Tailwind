import React from 'react'
import Navigation from '../Navigation'
import Sidebar from '../Sidebar'
import { ToastContainer, toast } from 'react-toastify';

export default function Layout({ children }: any) {
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
