import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from './axiosInterceptor';
import Navbar from '../Navbar';



const ProductDetail = () => {
    const { id } = useParams();
    const [products, setProducts] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const handleClick=async()=>{
      try{
        const response = await axiosInstance.delete(`/product/delete/${id}`);
        alert(response.data.message)
        navigate("/product/all-products")
      }catch(err){
        setError(err.response?.data?.detail || "Something went wrong.");
      }
  }
    
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(`/product/${id}`);
        setProducts(response.data.data); 
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.response?.data?.detail || "Something went wrong.");
      }
    };

    fetchProducts();
  }, []); 

  

    if (isLoading) {
      return <div>Loading...</div>;
  }

   if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
    <Navbar />
    
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Product Details</h1>
        <div
        key={products.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            backgroundColor: "#fff",
            textAlign: "center",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <h3 style={{ margin: "10px 0" }}>{products.name}</h3>
          <p style={{ fontSize: "14px" }}><strong>Description: </strong> {products.description}</p>
          <p>
            <strong>Price:</strong> {products.price}
          </p>
          <p>
            <strong>Stock:</strong> {products.stock}
          </p>
          <p>
            <strong>Category:</strong> {products.category}
          </p>
          <p>
            <strong>image_url:</strong> {products.image_url}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <Link to={`/product/update/${products.id}`}
            
            style={{
              textDecoration:"none",
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Update
          </Link>
          <button
            onClick={handleClick}
            style={{
              textDecoration:"none",
              padding: "10px 20px",
              backgroundColor: "#DC3545",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    
    </div>
  </>
  );
};

export default ProductDetail
