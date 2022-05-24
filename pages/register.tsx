import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { createUser } from "../service/user";


export default function Register() {
  const { register, handleSubmit, getValues, reset, formState: { errors }, } = useForm<any>();
  const onSubmit: SubmitHandler<any> = async data => {
    try {
      const response = await createUser({
        ...data,
        status: "1"
      });
      toast.success("Create Successfully");
      reset();
    } catch (error) {
      console.log(error)
      toast.error("Opsss! Something is wrong!");
    }
    
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="flex justify-center items-center h-screen ">
        <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Join our community</h2>
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
              {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email?.message}
              </p>
            )}
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="text"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  pattern: {
                    value: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                    message: "Password must be at least 8 characters and contain at least one uppercase, one lowercase, one number and one special character",
                  }
                })}
              />
              {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password?.message}
              </p>
            )}
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="text"
                placeholder="Confirm Password"
                {...register("confimPassword", {
                  validate: value => value === getValues("password") || "Passwords do not match"
                })}
              />
              {errors.confimPassword && (
              <p className="mt-2 text-sm text-red-500">
                {errors.confimPassword?.message}
              </p>
            )}
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
