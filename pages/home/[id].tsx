import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { getContentData, editContent } from "../../service/post";
import { useRouter } from "next/router";
import { ssrAuthCheck } from "../../middleware";
import { GetServerSideProps } from "next";

export default function EditPost(): any {
  const router = useRouter();
  const [setImage, setImageUrl] = useState(false);
  const [formImage, setFromImage] = useState();
  const [buttonHide, setButtonHide] = useState(true);
  const [waitingHide, setWaiting] = useState(false);
  const [myForm, setMyForm] = useState<any>({});

  const {
    register,
    handleSubmit,
    reset,
    getFieldState,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setWaiting(true);
    setButtonHide(false);
    console.log(formImage);
    const formData: any = new FormData();
    console.log(data.image);
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("image", formImage);
    formData.append("publish", data.publish);
    formData.append("authorId", 1);
    const response = await editContent(currentRoute, formData);
    toast.success("Update Successfully");
    setImageUrl(false);
    setWaiting(false);
    setButtonHide(true);
  };

  const currentRoute = router.query.id;

  const getData = async (id: any) => {
    const response = await getContentData(currentRoute);
    setMyForm(response);
    reset(response);
  };

  useEffect(() => {
    getData(currentRoute);
  }, [currentRoute, setImage]);

  return (
    <>
      {/* {JSON.stringify(myForm.image)} */}
      <div className="max-w-6xl bg-white p-16">
        <h2 className="text-2xl mb-10 font-bold">Add Blog Post</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Post Title
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Blog Title Here"
              required
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 5,
                  message: "Title must be at least 5 characters",
                },
              })}
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-500">
                {errors.title?.message}
              </p>
            )}
          </div>

          <div className="mb-6 mt-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Blog Description
            </label>
            <textarea
              rows="5"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Here is your blog coneten.."
              required
              {...register("content", {
                required: "Content is required",
                minLength: {
                  value: 10,
                  message: "Image must be at least 10 characters",
                },
              })}
            />
            {errors.content && (
              <p className="mt-2 text-sm text-red-500">
                {errors.content?.message}
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
                    src={`http://localhost:3000/posts/post-image/${myForm?.image}`}
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
                      {...register("image", {
                        // required: "Image is required",
                      })}
                      onChange={(event: any) => {
                        setFromImage(event.target.files[0]);
                        var reader = new FileReader();
                        reader.onload = function (e) {
                          setImageUrl(e.currentTarget.result);
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

          <div className="grid gap-6 mb-6 lg:grid-cols-2 mt-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Categories
              </label>
              <select
                id="country"
                autoComplete="country-name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("categories", {
                  // required: "Category is required",
                })}
              >
                <option value="">United States</option>
                <option value="1">Canada</option>
                <option value="2">Mexico</option>
              </select>
              {errors.categories && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.categories?.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Status
              </label>
              <select
                id="country"
                autoComplete="country-name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("publish", {
                  required: "Status is required",
                })}
              >
                <option>Seletct Status</option>
                <option value={1}>True</option>
                <option value={0}>False</option>
              </select>
              {errors.status && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.status?.message}
                </p>
              )}
            </div>
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
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await ssrAuthCheck(ctx);
  return {
    props: {},
  };
};
