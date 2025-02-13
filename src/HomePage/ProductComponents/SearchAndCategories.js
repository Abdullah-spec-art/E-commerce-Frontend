import React from "react";
import { useState, useEffect, useRef } from "react";
import axiosInstance from "./axiosInterceptor";
import { LuLayoutGrid } from "react-icons/lu";

const SearchAndCategories = ({
  setCategoryId,
  setSubCategoryId,
  setsearch,
  search,
  handleSubmit,
  handleCategoryChange,
  selectedCategoryId,
  setCertification_id,
  setSelectedCategoryId,
  setsearchTerm,
}) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const btnRef = useRef();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get(
          "/product/category/all-categories-subcategories-prac"
        );
        setCategories(response.data);
      } catch (err) {
        setError(err.response.data.detail ? "Error fetching products----" : "");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        btnRef.current &&
        !btnRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-[90%] mx-auto md:w-95 ">
      <div className="flex items-center px-5 py-4 md:px-4 bg-smoke lg:rounded-lg text-17px ">
        <button
          ref={btnRef}
          className={`hidden lg:flex items-center px-4 py-2 rounded-full ${
            isDropdownOpen ? "bg-white rounded-full" : ""
          }`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <LuLayoutGrid className="mr-1 text-2xl text-blue" />
          Categories
        </button>

        <div className="md:px-5 relative flex items-center  flex-grow">
          <div className="rounded-full border border-smoke-b bg-white px-2 md:px-3 py-2 w-full flex">
            <input
              className="px-2 flex-grow pt-2px outline-none focus:ring-0"
              type="text"
              placeholder="What are u looking for?"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />

            <select
              className={`bg-white border-l pl-3 pr-12 hidden lg:block outline-none ${
                selectedCategoryId ? "text-black" : "text-gray-400"
              }`}
              value={selectedCategoryId}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  className="font-normal text-black"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue text-white rounded-full ml-2 md:ml-0 px-3 md:px-10 py-3 md:py-2 flex items-center"
        >
          Search
        </button>
        <div
          ref={dropdownRef}
          className={`absolute top-full w-full left-0  bg-smoke shadow-lg p-4 transition-all duration-200 ease-in-out z-10 overflow-y-auto ${
            isDropdownOpen
              ? "opacity-100 scale-y-100 visible"
              : "opacity-0 scale-y-0 invisible"
          }`}
          style={{
            transformOrigin: "top",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${categories.length}, 1fr)`,
            }}
          >
            {categories.map((category) => (
              <div key={category.id}>
                <div
                  className="font-semibold text-sm hover:text-green-500"
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setCategoryId(category.id);
                    setSubCategoryId(null);
                    setIsDropdownOpen(false);
                    setCertification_id([]);
                    setsearch("");
                    setsearchTerm("");
                    setSelectedCategoryId(category.id);
                  }}
                >
                  {category.name}
                </div>

                {category.subcategories &&
                  category.subcategories.length > 0 && (
                    <div>
                      {category.subcategories.map((subcategory) => (
                        <div
                          className="text-xs hover:text-green-500"
                          key={subcategory.id}
                          style={{
                            padding: "10px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setSubCategoryId(subcategory.id);
                            setCategoryId(null);
                            setIsDropdownOpen(false);
                            setCertification_id([]);
                            setsearch("");
                            setsearchTerm("");
                            // setSelectedCategoryId(null);
                          }}
                        >
                          {subcategory.name}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndCategories;
