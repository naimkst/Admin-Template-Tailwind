import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Key } from "heroicons-react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { ssrAuthCheck } from "../../../middleware";
import {
  homeAmazonSellerAdd,
  homeCounterAdd,
  homeTestimonialCreate,
} from "../../../service/home";
import { amazonSellerCreate } from "../../../service/service";

export default function addTestimonial(): any {
  const router = useRouter();
  const [setImage, setImageUrl]: any = useState();
  const [formImage, setFromImage] = useState();
  const [buttonHide, setButtonHide] = useState(true);
  const [waitingHide, setWaiting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { isLoading, data, isSuccess, mutate, mutateAsync } =
    amazonSellerCreate();

  const onSubmit: SubmitHandler<any> = async (data) => {
    setWaiting(true);
    setButtonHide(false);

    const formData: any = new FormData();
    formData.append("aboutTitle", data.aboutTitle);
    formData.append("aboutDescription", data.aboutDescription);

    const response = await mutateAsync(formData);

    toast.success("Create Successfully");
    reset();
    setImageUrl(false);
    setWaiting(false);
    setButtonHide(true);
    router.push("/service/amazon-seller");
  };

  useEffect(() => {}, []);

  return (
    <>
      {/* { JSON.stringify(getCat)} */}
      <div className="max-w-6xl bg-white p-16">
        <h2 className="text-2xl mb-10 font-bold">Add</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Title"
              required
              defaultValue=""
              {...register("aboutTitle", {
                required: "Title is required",
              })}
            />
            {errors.aboutTitle && (
              <p className="mt-2 text-sm text-red-500">
                {errors.aboutTitle?.message}
              </p>
            )}
          </div>

          <div className="mb-6 mt-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              rows={5}
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description here.."
              required
              defaultValue=""
              {...register("aboutDescription", {
                required: "Content is required",
              })}
            />
            {errors.aboutDescription && (
              <p className="mt-2 text-sm text-red-500">
                {errors.aboutDescription?.message}
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
            {isLoading && <progress className="progress w-20"></progress>}
          </div>
        </form>
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await ssrAuthCheck(ctx);
  return {
    props: {},
  };
};
