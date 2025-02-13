import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiCloseLargeFill } from "react-icons/ri";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const MenuDropdown = () => {
    setIsMenuOpen((prev) => {
      if (prev) {
        setIsDropdownOpen(false);
      }
      return !prev;
    });
  };
  const toggleDropdown = () => {
    if (isMenuOpen) {
      setIsDropdownOpen((prev) => !prev);
    }
  };

  return (
    <>
      <div className="app-header py-6 md:py-8">
        <div className="flex items-center justify-between px-5 md:px-0 md:mx-10 lg:mx-20">
          <div className="flex items-center">
            <img
              src="/logo1.png"
              alt="logo image"
              className="w-40 h-14"
              onClick={() => (window.location.href = "/")}
            />

            <ul
              className="hidden lg:flex ml-12 justify-between lg:text-sm xl:text-base"
              id="menu"
            >
              <li className="pr-2 lg:pr-6">
                <Link to={"/"}>Expert Sourcing</Link>
              </li>

              <li className="px-2 lg:px-6">
                <Link to={"/"}>Contract Manufacturing</Link>
              </li>

              <li className="px-2 lg:px-6">
                <Link to={"/"}>Buy</Link>
              </li>

              <li className="px-2 lg:px-6">
                <Link to={"/"}>Financing</Link>
              </li>

              <li className="pl-2 lg:pl-6 flex relative group">
                <div className="flex items-center cursor-pointer">
                  About Us
                  <RiArrowDropDownLine className="w-5 text-4xl xl:text-3xl " />
                </div>
                <div
                  className="absolute left-0 invisible group-hover:visible flex-col bg-white shadow-md rounded-md mt-9
        opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform translate-y-[-10px] group-hover:translate-y-0 z-20"
                >
                  <ul className="px-3 py-2 w-32 border rounded-lg bg-white">
                    <li className="block py-2 text-gray-700 hover:text-green-500">
                      <Link>Our Story</Link>
                    </li>
                    <li className="block py-2 text-gray-700 hover:text-green-500">
                      <Link>How to buy</Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex items-center text-green justify-between ">
            <button className="hidden lg:flex items-center border rounded-full border-blue px-4 py-1 mr-2">
              <Link to={"user/signup"}>
                <span className="text-blue">Register</span>
              </Link>
            </button>
            <button className="hidden lg:flex items-center border rounded-full border-green-500 px-4 py-1 text-green-500">
              <Link className="flex items-center" to={"/user/login"}>
                <FiUser />
                <span className="ml-2">Sign in</span>
              </Link>
            </button>
            <span className="md:hidden mr-2 text-gray-900 font-medium">
              Sign in
            </span>
            <div className="text-green-500 text-3xl md:pl-8 flex justify-center">
              <Link className="relative" to={"/"}>
                <RiShoppingBasket2Line />
                <p className="bg-black text-white rounded-full w-4 h-4 text-center text-xs absolute bottom-0 right-0">
                  {" "}
                  0{" "}
                </p>
              </Link>
              <button onClick={MenuDropdown}>
                <GiHamburgerMenu className="lg:hidden ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 right-0 h-screen w-full bg-white px-5 pt-10 text-lg transition-all duration-500 ease-in-out z-10 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between">
          <ul>
            <li className="block py-3 px-8">
              <Link to={"/"}>Expert Sourcing</Link>
            </li>
            <li className="block py-3 px-8">
              <Link to={"/"}>Contract Manufacturing</Link>
            </li>
            <li className="block py-3 px-8">
              <Link to={"/"}>Buy</Link>
            </li>
            <li className="block py-3 px-8">
              <Link to={"/"}>Financing</Link>
            </li>
            <li className="block py-3 px-8">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                About Us
                <i className="pl-2">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </i>
              </div>
              <div
                className={`transition-all duration-500 ease-in-out transform ${
                  isDropdownOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden bg-white`}
              >
                <ul className="px-3 py-2 w-32 bg-white">
                  <li className="inline-block py-1 text-gray-700 hover:text-green-500">
                    <Link>Our Story</Link>
                  </li>
                  <li className="inline-block py-1 text-gray-700 hover:text-green-500">
                    <Link>How to buy</Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div className="text-3xl pr-5 font-bold">
            <RiCloseLargeFill
              onClick={MenuDropdown}
              className="text-green-500 "
            />
          </div>
        </div>
        <div className="px-8 py-10">
          <hr />
        </div>
        <div className="px-8 ">
          <button className="inline-flex items-center justify-center border rounded-full border-blue px-6 py-2 w-40 mr-2">
            <Link to={"user/signup"}>
              <span className="text-blue">Register</span>
            </Link>
          </button>
          <button className="inline-flex items-center justify-center border rounded-full border-green-500 px-6 py-2 w-40 text-green-500">
            <Link className="flex items-center" to={"/user/login"}>
              <FiUser />
              <span className="ml-2">Sign in</span>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
