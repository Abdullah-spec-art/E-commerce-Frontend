import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "./axiosInterceptor";
import Navbar from "../Navbar";

const UpdateProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image_url: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:8000/product/" + id
        );
        setProductData(response.data.data);
      } catch (err) {
        setError(
          err.response?.data?.detail || "Failed to fetch product details."
        );
      }
    };

    fetchProduct();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.put(
        `/product/update/${id}`,
        productData
      );
      alert(response.data.message);
      setMessage(response.data.message);
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to update product.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "600px", margin: "50px auto" }}>
        <h2 className="text-center mb-4">Update Product</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <label>
            <b>Product Name</b>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleInputChange}
            style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleInputChange}
            style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
            rows="4"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleInputChange}
            style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={productData.stock}
            onChange={handleInputChange}
            style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={productData.category}
            onChange={handleInputChange}
            style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
          />
          <input
            type="url"
            name="image_url"
            placeholder="Image URL"
            value={productData.image_url}
            onChange={handleInputChange}
            style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
          />
          {!isLoading ? (
            <button
              type="submit"
              style={{
                padding: "10px",
                backgroundColor: "#007BFF",
                color: "white",
              }}
            >
              Update Product
            </button>
          ) : (
            <button
              disabled
              style={{
                padding: "10px",
                backgroundColor: "#007BFF",
                color: "white",
              }}
            >
              Updating...
            </button>
          )}
        </form>

        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
};

export default UpdateProduct;
