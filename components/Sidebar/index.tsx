import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { removeCookies } from "cookies-next";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export default function Sidebar() {
  const router = useRouter();
  const user = useSelector((state: any) => state.user.users);
  const [menu, setMent]: any = useState("");

  // console.log("Redux Data", user);
  const handleLogout = () => {
    removeCookies("token");
    router.push("/login");
  };

  const menuHandler = (e: any) => {
    Cookies.remove("menu");
    Cookies.set("menu", e);
  };
  useEffect(() => {
    if (Cookies.get("menu")) {
      setMent(Cookies.get("menu"));
    }
  }, [menu, menuHandler]);

  return (
    <>
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            <a href="#" title="home">
              <img
                src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
                className="w-32"
                alt="tailus logo"
              />
            </a>
          </div>

          <div className="mt-8 text-center">
            <img
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
              alt=""
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
              {user?.fname} {user?.lname}
            </h5>
            <span className="hidden text-gray-400 lg:block">Admin</span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            <Link href="/">
              <li onClick={() => menuHandler("dashboard")}>
                <a
                  href="#"
                  aria-label="dashboard"
                  className={
                    menu == "dashboard"
                      ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                      : "relative px-4 py-3 flex items-center space-x-4 rounded-xl  to-cyan-400"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span className="-mr-1 font-medium">Dashboard</span>
                </a>
              </li>
            </Link>

            <li onClick={() => menuHandler("home")}>
              <Link href={"/home/hero-section"}>
                <a
                  href="#"
                  className={
                    menu == "home"
                      ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                      : "relative px-4 py-3 flex items-center space-x-4 rounded-xl  to-cyan-400"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  <span className="group-hover:text-gray-700">Home</span>
                </a>
              </Link>
              {menu == "home" && (
                <ul className="">
                  <Link href={"/home/hero-section"}>
                    <li className="relative">
                      <a
                        href=""
                        className="flex items-center text-[16px] py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                      >
                        Hero Section
                      </a>
                    </li>
                  </Link>

                  <Link href={"/home/our-philosophy"}>
                    <li className="relative">
                      <a
                        href=""
                        className="flex items-center text-[16px] py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                      >
                        Our Philosophy
                      </a>
                    </li>
                  </Link>

                  <Link href={"/home/testimonial-section"}>
                    <li className="relative">
                      <a
                        href=""
                        className="flex items-center text-[16px] py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                      >
                        Testimonail Section
                      </a>
                    </li>
                  </Link>

                  <Link href={"/home/testimonial"}>
                    <li className="relative">
                      <a
                        href=""
                        className="flex items-center text-[16px] py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                      >
                        Add Testimonails
                      </a>
                    </li>
                  </Link>

                  <Link href={"/home/creative-minds"}>
                    <li className="relative">
                      <a
                        href=""
                        className="flex items-center text-[16px] py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                      >
                        Add Creative Minds
                      </a>
                    </li>
                  </Link>

                  <Link href={"/home/counter"}>
                    <li className="relative">
                      <a
                        href=""
                        className="flex items-center text-[16px] py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                      >
                        Add Counter
                      </a>
                    </li>
                  </Link>

                  <Link href={"/home/amazon-seller-section"}>
                    <li className="relative">
                      <a
                        href=""
                        className="flex items-center text-[16px] py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                      >
                        Amazon Seller Section
                      </a>
                    </li>
                  </Link>

                  <Link href={"/home/amazon-seller"}>
                    <li className="relative">
                      <a
                        href=""
                        className="flex items-center text-[16px] py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                      >
                        Add Amazon Seller
                      </a>
                    </li>
                  </Link>
                  <Link href={"/home/our-portfolio"}>
                    <li className="relative">
                      <a
                        href=""
                        className="flex items-center text-[16px] py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                      >
                        Our Portfolio
                      </a>
                    </li>
                  </Link>

                  <Link href={"/home/project-idea"}>
                    <li className="relative">
                      <a
                        href=""
                        className="flex items-center text-[16px] py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                      >
                        Project Idea
                      </a>
                    </li>
                  </Link>

                  <Link href={"/home/our-brand"}>
                    <li className="relative">
                      <a
                        href=""
                        className="flex items-center text-[16px] py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                      >
                        Our Brand
                      </a>
                    </li>
                  </Link>
                </ul>
              )}
            </li>

            <li onClick={() => menuHandler("posts")}>
              <Link href="/posts">
                <a
                  href="#"
                  className={
                    router.pathname == "/posts" ||
                    router.pathname == "/posts/add-post"
                      ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                      : "relative px-4 py-3 flex items-center space-x-4 rounded-xl  to-cyan-400"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  <span className="group-hover:text-gray-700">Blog Posts</span>
                </a>
              </Link>
              {Cookies.get("menu") == "posts" && (
                <div>
                  <div
                    id="menu1"
                    className="flex justify-start  flex-col w-full md:w-auto items-start pb-1 "
                  >
                    <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                      <svg
                        className="fill-stroke"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <p className="text-base leading-4  ">Messages</p>
                    </button>
                    <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 19C10.2091 19 12 17.2091 12 15C12 12.7909 10.2091 11 8 11C5.79086 11 4 12.7909 4 15C4 17.2091 5.79086 19 8 19Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M10.85 12.15L19 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M18 5L20 7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M15 8L17 10"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <p className="text-base leading-4  ">Security</p>
                    </button>
                    <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 8.00002C15.1046 8.00002 16 7.10459 16 6.00002C16 4.89545 15.1046 4.00002 14 4.00002C12.8954 4.00002 12 4.89545 12 6.00002C12 7.10459 12.8954 8.00002 14 8.00002Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M4 6H12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M16 6H20"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M8 14C9.10457 14 10 13.1046 10 12C10 10.8954 9.10457 10 8 10C6.89543 10 6 10.8954 6 12C6 13.1046 6.89543 14 8 14Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M4 12H6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M10 12H20"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M17 20C18.1046 20 19 19.1046 19 18C19 16.8955 18.1046 16 17 16C15.8954 16 15 16.8955 15 18C15 19.1046 15.8954 20 17 20Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M4 18H15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M19 18H20"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <p className="text-base leading-4  ">Settings</p>
                    </button>
                  </div>
                </div>
              )}
            </li>

            <Link href="/users">
              <li>
                <a
                  href="#"
                  className={
                    router.pathname == "/users"
                      ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                      : "relative px-4 py-3 flex items-center space-x-4 rounded-xl  to-cyan-400"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="group-hover:text-gray-700">Users</span>
                </a>
              </li>
            </Link>
            <Link href="/categories">
              <li>
                <a
                  href="#"
                  className={
                    router.pathname == "/categories"
                      ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                      : "relative px-4 py-3 flex items-center space-x-4 rounded-xl  to-cyan-400"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      className="fill-current text-gray-300 group-hover:text-cyan-300"
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                    />
                    <path
                      className="fill-current text-gray-600 group-hover:text-cyan-600"
                      d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                    />
                  </svg>
                  <span className="group-hover:text-gray-700">Categories</span>
                </a>
              </li>
            </Link>
            <Link href="/settings">
              <li>
                <a
                  href="#"
                  className={
                    router.pathname == "/settings"
                      ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                      : "relative px-4 py-3 flex items-center space-x-4 rounded-xl  to-cyan-400"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="group-hover:text-gray-700">Settings</span>
                </a>
              </li>
            </Link>
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button
            onClick={() => handleLogout()}
            className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="group-hover:text-gray-700">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
