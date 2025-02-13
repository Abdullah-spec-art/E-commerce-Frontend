import React, { use, useEffect, useState } from "react";
import axiosInstance from "./axiosInterceptor";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import SearchAndCategories from "./SearchAndCategories";
import Picture from "./Picture";
import Certification from "./Certification";
import { debounce } from "lodash";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [search, setsearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [certification_id, setCertification_id] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    console.log("Fetching products with query params:", {
      categoryId,
      subCategoryId,
      search,
      certification_id,
      minPrice,
      maxPrice,
    });
    fetchAllProducts();
  }, [categoryId, subCategoryId, certification_id, minPrice, maxPrice]);

  const fetchAllProducts = async () => {
    // setIsLoading(true);
    let queryParams = [];

    if (search) {
      console.log("---search---", search);
      queryParams.push(`search=${search}`);
    }
    if (categoryId) {
      console.log("------Category ID-------:", categoryId);
      queryParams.push(`category_id=${categoryId}`);
    }
    if (subCategoryId) {
      console.log("------SubCategory ID-------:", subCategoryId);
      queryParams.push(`subcategory_id=${subCategoryId}`);
    }
    if (certification_id && certification_id.length > 0) {
      console.log("------certification_id-------:", certification_id);
      queryParams.push(`certification_id=${certification_id.join(",")}`);
    }
    if (minPrice) {
      queryParams.push(`min_price=${minPrice}`);
    }
    if (maxPrice) {
      queryParams.push(`max_price=${maxPrice}`);
    }

    const query = queryParams.length > 0 ? queryParams.join("&") : "";
    console.log("---query----", query);

    try {
      const response = await axiosInstance.get(
        `/product/all-products?${query}`
      );
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError(err.response.data.detail);
      setProducts([]);
    }
  };

  const handleCategoryChange = (e) => {
    const newCategoryId = e.target.value;
    setSelectedCategoryId(newCategoryId);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    console.log("Category ID submitted:", selectedCategoryId);
    console.log("Search term:", search);
    setCertification_id([]);
    setsearchTerm(search);
    if (selectedCategoryId) {
      setCategoryId(selectedCategoryId);
      setSubCategoryId(null);
    } else if (!search) {
      setCategoryId(null);
      setSubCategoryId(null);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="text-dark">
          <SearchAndCategories
            setCategoryId={setCategoryId}
            setSubCategoryId={setSubCategoryId}
            handleSubmit={handleSubmit}
            setsearch={setsearch}
            search={search}
            handleCategoryChange={handleCategoryChange}
            selectedCategoryId={selectedCategoryId}
            setCertification_id={setCertification_id}
            setSelectedCategoryId={setSelectedCategoryId}
            setsearchTerm={setsearchTerm}
          />
        </div>
        {products.length > 0 && (
          <div className="px-5 md:px-0 md:w-95 mt-10 pb-8 md:pb-10 mx-auto w-[90%]">
            <div className="lg:flex pb-6">
              <div>
                <div className="pb-6">
                  <span className="text-xl font-medium capitalize">
                    Products
                  </span>
                  <span className="text-xl text-dark pl-3 opacity-50">
                    ({products.length} Products)
                  </span>
                </div>
                <Certification
                  setCertification_id={setCertification_id}
                  certification_id={certification_id}
                  categoryId={categoryId}
                  subCategoryId={subCategoryId}
                  search={search}
                  searchTerm={searchTerm}
                  setsearchTerm={setsearchTerm}
                  setMinPrice={setMinPrice}
                  setMaxPrice={setMaxPrice}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                />
              </div>
              <div className="pt-3 w-full">
                <div className="my-4  grid grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-10">
                  {products.map((product) => (
                    <div
                      className="group hover:shadow-[0_2px_12px_-5px_#231f20] border-transparent rounded-lg"
                      key={product.id}
                    >
                      <div className="p-2">
                        <Link to={`product/${product.id}`}>
                          <div className="pt-2 pb-6 w-full">
                            <img
                              className="h-48 mx-auto object-cover  align-middle"
                              src={product.image_url}
                              alt={product.name}
                            />
                          </div>
                          <div className="pt-2">
                            <p className="capitalize pb-1">{product.name}</p>
                            <p className="text-gray-400 text-sm">
                              Stock: {product.stock}
                            </p>
                            <div className="pt-1">
                              <strong>Price:</strong> ${product.price}
                            </div>
                            <div className="pt-3 h-12 ">
                              <button className=" w-full bg-blue text-white pb-1 pt-1 h-8 opacity-0 group-hover:opacity-100 rounded-lg">
                                Add to cart
                              </button>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="text-center border py-8">
          {error && <p className=" text-xl text-red-700 mt-3">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
