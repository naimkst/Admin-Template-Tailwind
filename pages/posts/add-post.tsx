import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { getContentData, editContent, postFormData } from "../../service/post";

export default function addPost(): any {

  const [setImage, setImageUrl] = useState(false);
  const [formImage, setFromImage] = useState();
  const [buttonHide, setButtonHide] = useState(true);
  const [waitingHide, setWaiting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  
  const onSubmit: SubmitHandler<any> = async data => {

    setWaiting(true);
    setButtonHide(false);

    const formData: any = new FormData();
    console.log(data.image);
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("image", formImage);
    formData.append("publish", data.publish);
    formData.append("authorId", 1);

    const response = await postFormData(formData);

    toast.success('Create Successfully');
    reset()
    setImageUrl(false);
    setWaiting(false);
    setButtonHide(true);
  };


  return (
    <>
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
              defaultValue=""
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 5,
                  message: "Title must be at least 5 characters",
                },
              })}
            />
            {errors.title &&
              <p className="mt-2 text-sm text-red-500">
                {errors.title?.message}
              </p>
            }
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
              defaultValue=""
              {...register("content", {
                required: "Content is required",
                minLength: {
                  value: 10,
                  message: "Content must be at least 10 characters",
                }
              })}
            />
            {errors.content &&
              <p className="mt-2 text-sm text-red-500">
                {errors.content?.message}
              </p>
            }
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Thumbnail
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {setImage ? <img
                  className="inline-block h-44 w-44 mb-6  ring-2 ring-white"
                  src={setImage}
                  alt=""
                /> : <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  {setImage ? '' : <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                  ></path>}

                </svg>}

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
                        required: "Content is required",
                      })}
                      onChange={(event: any) => {
                        setFromImage(
                          event.target.files[0],
                        );
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

            {setImage ? '' : (errors.image &&
              <p className="mt-2 text-sm text-red-500">
                {errors.image?.message}
              </p>)}

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
                defaultValue=""
                {...register("categories", {
                  required: "Category is required",
                })}
              >
                <option value=''>United States</option>
                <option value="1">Canada</option>
                <option value="2">Mexico</option>
              </select>
              {errors.categories &&
                <p className="mt-2 text-sm text-red-500">
                  {errors.categories?.message}
                </p>
              }
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
                defaultValue=""
                {...register("publish", {
                  required: "Status is required",
                })}
              >
                <option value=''>Seletct Status</option>
                {/* @ts-ignore */}
                <option value={Boolean(true)}>True</option>
                {/* @ts-ignore */}
                <option value={Boolean(false)}>False</option>
              </select>
              {errors.status &&
                <p className="mt-2 text-sm text-red-500">
                  {errors.status?.message}
                </p>
              }
            </div>
          </div>

          <div>
            { buttonHide && 
            <button
              type="submit"
              className="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
            }
            <br />
            { waitingHide && 
            <progress className="progress w-20"></progress>
            }
          </div>

        </form>
      </div>
    </>
  );
}
