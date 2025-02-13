import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "./axiosInterceptor";
import _ from "lodash";

const Certification = ({
  setCertification_id,
  certification_id,
  categoryId,
  subCategoryId,
  searchTerm,
  setMaxPrice,
  setMinPrice,
  minPrice,
  maxPrice,
}) => {
  const [certifications, setCertifications] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [supplierSearch, setSupplierSearch] = useState("");

  const [error, setError] = useState("");

  // Fetch certifications when filters change
  useEffect(() => {
    const fetchCertifications = async () => {
      let query = "";
      if (categoryId) query += `&category_id=${categoryId}`;
      if (subCategoryId) query += `&subcategory_id=${subCategoryId}`;
      if (searchTerm) query += `&general_search=${searchTerm}`;
      console.log("certificate------", categoryId, subCategoryId);
      try {
        const response = await axiosInstance.get(
          `/product/certification/certification-names?${query}`
        );
        setCertifications(response.data);
        setError(null);
      } catch (err) {
        setError(err.response.data.detail);
        setCertifications([]);
      }
    };

    fetchCertifications();
  }, [categoryId, subCategoryId, searchTerm]);

  // Filter product certifications
  const filteredProductCerts = certifications
    .filter((cert) => cert.certification_type === "Product")
    .flatMap((cert) => cert.certifications)
    .filter((c) =>
      c.certification_name.toLowerCase().includes(productSearch.toLowerCase())
    );

  // Filter supplier certifications
  const filteredSupplierCerts = certifications
    .filter((cert) => cert.certification_type === "Supplier")
    .flatMap((cert) => cert.certifications)
    .filter((c) =>
      c.certification_name.toLowerCase().includes(supplierSearch.toLowerCase())
    );

  const handleCheckboxChange = (id) => {
    setCertification_id((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const debouncedSetPrice = useCallback(
    _.debounce((min, max) => {
      setMinPrice(min);
      setMaxPrice(max);
    }, 500),
    []
  );

  const handlePriceChange = (e, type) => {
    const value = e.target.value;
    if (type == "min") {
      debouncedSetPrice(value, maxPrice);
    } else {
      debouncedSetPrice(minPrice, value);
    }
  };

  return (
    <div className="w-full lg:w-auto text-sm lg:pr-10 hidden lg:block">
      <div className="lg:w-80 border rounded p-5 shadow-xl lg:shadow-none">
        <div className="pt-8">
          <h3 className="text-lg">Price</h3>
          <div className="pt-3 flex items-center">
            <div className="rounded-full bg-smoke flex items-center py-2 border border-dark-b">
              <input
                type="text"
                placeholder="from"
                className="bg-smoke w-4/5 text-center outline-none"
                onChange={(e) => handlePriceChange(e, "min")}
              />
              <span>$</span>
            </div>
            <span className="mx-1 w-5 border-t border-smoke-b"></span>
            <div className="rounded-full bg-smoke flex items-center py-2 border border-dark-b">
              <input
                type="text"
                placeholder="to"
                className="bg-smoke w-4/5 text-center outline-none"
                onChange={(e) => handlePriceChange(e, "max")}
              />
              <span>$</span>
            </div>
          </div>
        </div>
        <div className="pt-8">
          <h3 className="text-lg">Product certification</h3>
          <div className="pt-3">
            <div className="rounded-full bg-smoke flex items-center py-2 border border-dark-b px-3">
              <input
                type="text"
                placeholder="Product Certifications..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="bg-smoke flex-grow text-center outline-none"
              />
            </div>
          </div>
          <div className="pt-5">
            <div className="pt-5 max-h-44 overflow-auto">
              {filteredProductCerts.map((cert) => (
                <div key={cert.id} className="py-1 flex items-center">
                  <label className="cursor-pointer select-none flex items-center">
                    <input
                      type="checkbox"
                      checked={certification_id.includes(cert.id)}
                      onChange={() => handleCheckboxChange(cert.id)}
                      className="mr-2 w-5 h-5"
                    />
                    <span className="pl-4">{cert.certification_name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8">
          <h3 className="text-lg">Supplier certification</h3>
          <div className="pt-3">
            <div className="rounded-full bg-smoke flex items-center py-2 border border-dark-b px-3">
              <input
                type="text"
                placeholder="Supplier Certifications..."
                value={supplierSearch}
                onChange={(e) => setSupplierSearch(e.target.value)}
                className="bg-smoke flex-grow text-center outline-none"
              />
            </div>
          </div>
          <div className="pt-5">
            <div className="pt-5 max-h-44 ">
              {filteredSupplierCerts.map((cert) => (
                <div key={cert.id} className="py-1 flex items-center">
                  <label className="cursor-pointer select-none flex items-center">
                    <input
                      type="checkbox"
                      checked={certification_id.includes(cert.id)}
                      onChange={() => handleCheckboxChange(cert.id)}
                      className="mr-2 w-5 h-5"
                    />
                    <span className="pl-4">{cert.certification_name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default Certification;
