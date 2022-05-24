import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { userLogin } from "../service/user";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/router'
import { setCookies } from 'cookies-next';
import { useDispatch } from 'react-redux';
import { addUser } from "../redux/user";

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch();
  const [ loginData, setLogindata ] = useState();

  const { register, handleSubmit } = useForm<any>();
  const onSubmit: SubmitHandler<any> = async data => {
    try {
      const response = await userLogin(data);
      toast.success("Create Successfully");
      setCookies('token', response.token);
      setLogindata(response.user);
      dispatch(addUser(response.user));
      router.push("/")

    } catch (error) {
      toast.error("Credentials are not correct");
    }

  };

  useEffect(() => {
    // dispatch(addUser(loginData));
  }, []);
  return (
    <>
    <form  onSubmit={handleSubmit(onSubmit)}>
      <section className="flex justify-center items-center h-screen ">
        <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Enter Your login details</h2>
          </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="text"
                placeholder="Email"
                {...register("email", { 
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "invalid email address"
                  }
                })}
              />
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="text"
                placeholder="Password"
                {...register("password")}
              />
            </div>
          
            <div>
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
              >
                Registration
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-row items-center">
                <input
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="comments"
                  className="ml-2 text-sm font-normal text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <div>
                <a className="text-sm text-blue-600 hover:underline" href="#">
                  Forgot password?
                </a>
              </div>
            </div>
        </div>
      </section>
      </form>
    </>
  );
}
