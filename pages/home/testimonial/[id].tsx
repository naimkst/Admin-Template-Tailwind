import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { ssrAuthCheck } from "../../../middleware";
import { homeTestimonialUpdate } from "../../../service/home";
import request from "../../../lib/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function editTestimonial(): any {
  const router = useRouter();
  const [setImage, setImageUrl]: any = useState();
  const [formImage, setFromImage] = useState();
  const [buttonHide, setButtonHide] = useState(true);
  const [waitingHide, setWaiting] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const currentRoute = router.query.id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { isLoading, data, isSuccess, mutate, mutateAsync } =
    homeTestimonialUpdate(currentRoute);

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
    setWaiting(true);
    setButtonHide(false);

    const formData: any = new FormData();
    formData.append("testimonialName", data.testimonialName);
    formData.append("testimonialDesignation", data.testimonialDesignation);
    formData.append("image", formImage);
    formData.append("testimonialDescription", data.testimonialDescription);
    mutateAsync(formData);
    toast.success("Update Successfully");
    setImageUrl(false);
    setWaiting(false);
    setButtonHide(true);
    router.push("/home/testimonial");
  };

  const { isLoading: loading }: any = useQuery(["resTestimonail"], async () => {
    const { data } = await request.get(`/home/testimonail/${currentRoute}`);
    reset(data);
    setResponseData(data);
    return data;
  });
  useEffect(() => {}, [currentRoute]);

  return (
    <>
      <div className="max-w-6xl bg-white p-16">
        <h2 className="text-2xl mb-10 font-bold">Add Testimonail</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              required
              defaultValue=""
              {...register("testimonialName", {
                required: "Title is required",
              })}
            />
            {errors.testimonialName && (
              <p className="mt-2 text-sm text-red-500">
                {errors.testimonialName?.message}
              </p>
            )}
          </div>

          <div className=" mt-6">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Designation
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Designation"
              required
              defaultValue=""
              {...register("testimonialDesignation", {
                required: "Title is required",
              })}
            />
            {errors.testimonialDesignation && (
              <p className="mt-2 text-sm text-red-500">
                {errors.testimonialDesignation?.message}
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
              placeholder="Here is your blog coneten.."
              required
              defaultValue=""
              {...register("testimonialDescription", {
                required: "Content is required",
              })}
            />
            {errors.testimonialDescription && (
              <p className="mt-2 text-sm text-red-500">
                {errors.testimonialDescription?.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Thumbnail
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {!setImage && (
                  <img
                    className="inline-block h-44 w-44 mb-6  ring-2 ring-white"
                    src={`http://localhost:3000/posts/post-image/${responseData?.image}`}
                    alt=""
                  />
                )}

                {setImage && (
                  <img
                    className="inline-block h-44 w-44 mb-6  ring-2 ring-white"
                    src={setImage}
                    alt=""
                  />
                )}

                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      defaultValue=""
                      {...register("image", {
                        // required: "Content is required",
                      })}
                      onChange={(event: any) => {
                        setFromImage(event.target.files[0]);
                        var reader = new FileReader();
                        reader.onload = function (e) {
                          setImageUrl(e?.target?.result);
                        };
                        var url = reader.readAsDataURL(event.target.files[0]);
                      }}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>

            {setImage
              ? ""
              : errors.image && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.image?.message}
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
