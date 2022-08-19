import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { ssrAuthCheck } from "../../middleware";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import request from "../../lib/request";
import { homeAmazonSellerSectionUpdate } from "../../service/home";

export default function homeTestimonialSection(): any {
  const router = useRouter();
  const [setImage, setImageUrl] = useState(false);
  const [formImage, setFromImage] = useState();
  const [buttonHide, setButtonHide] = useState(true);
  const [waitingHide, setWaiting] = useState(false);
  const [responseData, setResponseData] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {}, [responseData]);

  const {
    isLoading: dataLoading,
    data,
    isSuccess,
    mutateAsync,
  } = homeAmazonSellerSectionUpdate();

  const onSubmit: SubmitHandler<any> = async (data) => {
    setWaiting(true);
    setButtonHide(false);
    mutateAsync(data);
    toast.success("Create Successfully");
    reset();
    setImageUrl(false);
    setWaiting(false);
    setButtonHide(true);
  };

  const { isLoading }: any = useQuery(["repoData"], async () => {
    const { data } = await request.get("/home/amazon-seller-section/1");
    reset(data);
    setResponseData(data);
    return data;
  });

  if (isLoading) return <Loading />;

  return (
    <>
      {/* { JSON.stringify(getCat)} */}
      <div className="max-w-6xl bg-white p-16">
        <h2 className="text-2xl mb-10 font-bold">Testimonial Section</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-5">
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
              placeholder="Title.."
              required
              defaultValue=""
              {...register("amazonSectionTitle", {
                required: "Title is required",
              })}
            />
            {errors.amazonSectionTitle && (
              <p className="mt-2 text-sm text-red-500">
                {errors.amazonSectionTitle?.message}
              </p>
            )}
          </div>

          <div className="mb-6 mt-6">
            <label
              htmlFor="Description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              rows={5}
              id="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description here..."
              required
              defaultValue=""
              {...register("amazonSectionDescription", {
                required: "Description is required",
              })}
            />
            {errors.amazonSectionDescription && (
              <p className="mt-2 text-sm text-red-500">
                {errors.amazonSectionDescription?.message}
              </p>
            )}
          </div>

          <div className="my-5">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              More Url
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="More Url.."
              required
              defaultValue=""
              {...register("amazonSectionMoreUrl", {
                required: "Title is required",
              })}
            />
            {errors.amazonSectionMoreUrl && (
              <p className="mt-2 text-sm text-red-500">
                {errors.amazonSectionMoreUrl?.message}
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
            {dataLoading && <progress className="progress w-20"></progress>}
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
