import Link from "next/link";
import { getUser, deleteById } from "../../service/user";
import React, { useEffect, useState } from "react";
import urlJoin from "url-join";
import { ToastContainer, toast } from "react-toastify";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [curentPage, setCurrentPage] = useState(0);
  const [showPerPage, setshowPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);

  const getData = async (quantity: number, perpage: number, search: string) => {
    setLoading(true);
    const response = await getUser(quantity, perpage, search);
    setUsers(response.data);
    setTotalPage(response.totalPage);
    setLoading(false);
  };

  const deleteHandle = async (id: number) => {
    const response = await deleteById(id);
    toast.success("Delete Successfully");
  };

  useEffect(() => {
    console.log(search);
    getData(curentPage * 5, showPerPage, search);
  }, [curentPage, showPerPage, search]);

  if(users?.length > 0){
    return (
      <>
        {/* { JSON.stringify(users)} */}
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center">
              <a
                className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800"
                href=" #"
              >
                <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                  <p>All</p>
                </div>
              </a>
              <a
                className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href="#"
              >
                <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                  <p>Done</p>
                </div>
              </a>
              <a
                className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href="#"
              >
                <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                  <p>Pending</p>
                </div>
              </a>
            </div>
            <Link href="/users/add-user">
              <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                <p className="text-sm font-medium leading-none text-white">
                  Add Task
                </p>
              </button>
            </Link>
          </div>
        </div>
  
        <div className="flex justify-center mt-5">
          <select
            defaultValue={showPerPage}
            onChange={(e: any) => setshowPerPage(e.target.value)}
            className="select select-primary max-w-xs"
          >
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
  
          <p className="mx-5">search</p>
          <input
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            type="text"
            className="input input-primary max-w-xl"
          />
        </div>
  
        {isLoading ? (
          <div className="flex justify-center mt-5">
            <svg
              role="status"
              className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex items-center  font-sans overflow-hidden">
              <div className="w-full">
                <div className="bg-white shadow-md rounded my-6">
                  <table className="min-w-max w-full table-auto">
                    <thead>
                      <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Title</th>
                        <th className="py-3 px-6 text-left">Date</th>
                        <th className="py-3 px-6 text-center">Users</th>
                        <th className="py-3 px-6 text-center">Status</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      {users?.map((user: any) => {
                        const list: any = (
                          <tr
                            key={user?.id}
                            className="border-b border-gray-200 hover:bg-gray-100"
                          >
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              <div className="flex items-center">
                                {/* <div className="mr-2">
                                  <img
                                    src={urlJoin(
                                      "http://localhost:3000",
                                      "posts",
                                      "post-image",
                                      user?.image
                                    )}
                                    width="25"
                                    height="25"
                                    alt=""
                                  />
                                </div> */}
                                <span className="font-medium">{user?.email}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-left">
                              <div className="flex items-center">
                                <div className="mr-2">
                                  {/* <img className="w-6 h-6 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg" /> */}
                                </div>
                                <span>{user?.createdAt}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center justify-center">
                                <img
                                  className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
                                  src="https://randomuser.me/api/portraits/men/1.jpg"
                                />
                                <img
                                  className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
                                  src="https://randomuser.me/api/portraits/women/2.jpg"
                                />
                                <img
                                  className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
                                  src="https://randomuser.me/api/portraits/men/3.jpg"
                                />
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              {user.publish == true ? (
                                <span className="bg-green-500 text-white py-1 px-3 rounded-full text-xs">
                                  Active
                                </span>
                              ) : (
                                <span className="bg-red-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                  Draft
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex item-center justify-center">
                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                </div>
  
                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                  <Link href={`/users/${user.id}`}>
                                  <a href="">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                  </a>
                                  </Link>
                                </div>
  
                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                  <a
                                    onClick={() => deleteHandle(user.id)}
                                    href="#"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                        return list;
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="btn-group flex justify-center">
                  {[...Array(totalPage)].map((page: any, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`btn btn-md mr-2 btn-outline ${
                        curentPage == index && "btn-active"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
    
  }else{
    return (
      <>
       <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center">
              <a
                className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800"
                href=" #"
              >
                <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                  <p>All</p>
                </div>
              </a>
              <a
                className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href="#"
              >
                <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                  <p>Done</p>
                </div>
              </a>
              <a
                className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href="#"
              >
                <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                  <p>Pending</p>
                </div>
              </a>
            </div>
            <Link href="/posts/add-post">
              <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                <p className="text-sm font-medium leading-none text-white">
                  Add Task
                </p>
              </button>
            </Link>
          </div>
        </div>
      
      
        <div className="flex justify-center mt-5">
            <svg
              role="status"
              className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>

      </>
    )
  }

}
