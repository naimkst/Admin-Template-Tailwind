import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Key } from "heroicons-react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { ssrAuthCheck } from "../../../middleware";
import {
  homeCounterAdd,
  homeCounterUpdate,
  homeTestimonialCreate,
} from "../../../service/home";
import request from "../../../lib/request";
import { useQuery } from "@tanstack/react-query";

export default function eidtCounter(): any {
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
    homeCounterUpdate(currentRoute);

  const onSubmit: SubmitHandler<any> = async (data) => {
    setWaiting(true);
    setButtonHide(false);

    const formData: any = new FormData();
    formData.append("counterTitle", data.counterTitle);
    formData.append("counterValue", data.counterValue);
    formData.append("image", formImage);
    formData.append("counterUrl", data.counterUrl);

    const response = await mutateAsync(formData);

    toast.success("Create Successfully");
    reset();
    setImageUrl(false);
    setWaiting(false);
    setButtonHide(true);
    router.push("/home/counter");
  };

  const { isLoading: loading }: any = useQuery(["resTestimonail"], async () => {
    const { data } = await request.get(`/home/counter/${currentRoute}`);
    reset(data);
    setResponseData(data);
    return data;
  });

  useEffect(() => {}, [currentRoute]);

  return (
    <>
      {/* { JSON.stringify(getCat)} */}
      <div className="max-w-6xl bg-white p-16">
        <h2 className="text-2xl mb-10 font-bold">Add Counter</h2>
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
              {...register("counterTitle", {
                required: "Title is required",
              })}
            />
            {errors.counterTitle && (
              <p className="mt-2 text-sm text-red-500">
                {errors.counterTitle?.message}
              </p>
            )}
          </div>

          <div className=" mt-6">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Value
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Designation"
              required
              defaultValue=""
              {...register("counterValue", {
                required: "Title is required",
              })}
            />
            {errors.counterValue && (
              <p className="mt-2 text-sm text-red-500">
                {errors.counterValue?.message}
              </p>
            )}
          </div>

          <div className="mb-6 mt-6">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Counter URL
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="URL"
              defaultValue=""
              {...register("counterUrl", {
                required: "Title is required",
              })}
            />
            {errors.counterUrl && (
              <p className="mt-2 text-sm text-red-500">
                {errors.counterUrl?.message}
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
function setResponseData(data: any) {
  throw new Error("Function not implemented.");
}
