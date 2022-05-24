import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { createUser } from "../../service/user";
import Router from 'next/router'

export default function addUser(): any {
  const [buttonHide, setButtonHide] = useState(true);
  const [waitingHide, setWaiting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = async (data) => {
    setWaiting(true);
    setButtonHide(false);
    console.log(data)

    // const formData: any = new FormData();
    // formData.append("fname", data.fname);
    // formData.append("lname", data.lname);
    // formData.append("email", data.email);
    // formData.append("password", data.password);
    // formData.append("bio", data.bio);
    // formData.append("status", "1");

    const response = await createUser({ 
      ...data,
      status: "1"
    });
    toast.success("Create Successfully");
    reset();
    setWaiting(false);
    setButtonHide(true);
    Router.push('/users')
  };

  return (
    <>
      <div className="max-w-6xl bg-white p-16">
        <h2 className="text-2xl mb-10 font-bold">Add Users</h2>
        <form onSubmit={handleSubmit(onSubmit)}>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="First Name"
              required
              {...register("fname", {
                required: "Title is required",
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters",
                },
              })}
            />
            {errors.fname && (
              <p className="mt-2 text-sm text-red-500">
                {errors.fname?.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="laname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Last Name
            </label>
            <input
              type="text"
              id="laname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Blog Title Here"
              required
              {...register("lname", {
                required: "Title is required",
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters",
                },
              })}
            />
            {errors.lname && (
              <p className="mt-2 text-sm text-red-500">
                {errors.lname?.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Blog Title Here"
              required
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Blog Title Here"
              required
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                  message: "Password must be at least 8 characters and contain at least one uppercase, one lowercase, one number and one special character",
                },
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters",
                },
              })}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password?.message}
              </p>
            )}
          </div>
        </div>


          <div className="mb-6 mt-6">
            <label
              htmlFor="dio"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Bio
            </label>
            <textarea
              rows="5"
              id="bio"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Here is your blog coneten.."
              {...register("bio", {
                required: "Content is required",
                minLength: {
                  value: 10,
                  message: "Content must be at least 10 characters",
                },
              })}
            />
            {errors.bio && (
              <p className="mt-2 text-sm text-red-500">
                {errors.bio?.message}
              </p>
            )}
          </div>

          

          <div>
            {buttonHide && (
              <button
                type="submit"
                className="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            )}
            <br />
            {waitingHide && <progress className="progress w-20"></progress>}
          </div>
        </form>
      </div>
    </>
  );
}
