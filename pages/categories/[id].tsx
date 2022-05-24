import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { updateData, getCategoryData } from "../../service/category";
import { useRouter } from 'next/router'
import { GetServerSideProps } from "next";
import { ssrAuthCheck } from "../../middleware";


export default function editCategory(): any {
  const router = useRouter();
  const curentRoute = router.query.id;
  const [buttonHide, setButtonHide] = useState(true);
  const [waitingHide, setWaiting] = useState(false);
  const [setImage, setImageUrl] = useState(false);
  const [responseImage, setResponseImage] = useState();
  const [ getCategory, setCategory ] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = async (data) => {
    setWaiting(true);
    setButtonHide(false);

    console.log(responseImage);
    const formData: any = new FormData();
    formData.append("categoryName", data.categoryName);
    formData.append("status", data.status);
    formData.append("image", responseImage);

    const response = await updateData(curentRoute, formData);
    console.log(response)
    toast.success("Update Successfully");
    reset();
    setWaiting(false);
    setButtonHide(true);
    router.push('/categories')
  };
  const getCatData = async () => {
    const response = await getCategoryData(curentRoute);
    console.log(response)
    setCategory(response);
    reset(response);
    // setFromImage(response.image);
    setResponseImage(response.image);
  }

  useEffect(() => {
    getCatData();
  }, [curentRoute]);

  return (
    <>
    { JSON.stringify(getCategory.image)}
      <div className="max-w-6xl bg-white p-16">
        <h2 className="text-2xl mb-10 font-bold">Add Category</h2>
        <form onSubmit={handleSubmit(onSubmit)}>

        <div className="grid grid-cols-2 gap-4 mb-6">
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
              placeholder="First Name"
              required
              {...register("categoryName", {
                required: "Title is required",
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters",
                },
              })}
            />
            {errors.categoryName && (
              <p className="mt-2 text-sm text-red-500">
                {errors.categoryName?.message}
              </p>
            )}
          </div>

          <div>
          <label
              htmlFor="laname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Status
            </label>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="state"
            {...register("status", {
              required: "Status is required",
            })}
            >
              <option value="">--- Select Your Status ---</option>
              <option value="0">False</option>
              <option value="1">True</option>
            </select>

            {errors.status && (
              <p className="mt-2 text-sm text-red-500">
                {errors.status?.message}
              </p>
            )}
          </div>
        </div>


        <div>
            <label className="block text-sm font-medium text-gray-700">
              Thumbnail
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                { setImage ? (
                  <img
                    className="inline-block h-44 w-44 mb-6  ring-2 ring-white"
                    src={setImage}
                    alt=""
                  />
                ) : (
                  <img
                  className="inline-block h-44 w-44 mb-6  ring-2 ring-white"
                  src={`http://localhost:3000/posts/post-image/${getCategory.image}`}
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
                        // required: "Image is required",
                      })}
                      onChange={(event: any) => {
                        setResponseImage(event.target.files[0]);
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