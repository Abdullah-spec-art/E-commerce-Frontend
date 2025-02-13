import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/user/login", formData);
      setMessage(response.data.message);
      setIsLoading(false);
      if (response.data.data.email_verified===false){
        alert(response.data.message)
        localStorage.setItem("email", formData.email);
        navigate("/user/verify-otp?page=/")
      }else{
        navigate("/home")
      }
      localStorage.setItem("access_token", response.data.data.access_token);
    }catch (err) {
      if (err.response) {
        setError(err.response.data.detail);
        setIsLoading(false);
      } else {
        setError('An error occurred. Please try again later.');
        setIsLoading(false);
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
          required
        />
        {!isLoading && (
          <button
            type="submit"
            style={{
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        )}
        {isLoading && (
          <button
            disabled
            type="submit"
            style={{
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              cursor: "not-allowed",
            }}
          >
            Loading...
          </button>
        )}
      </form>

      {/* Display success message */}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {/* Display error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Links for Signup and Forgot Password */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <Link
    to="/user/signup"
    style={{
      textDecoration: "none",
      color: "#007BFF",
      margin: "5px",
      fontSize: "16px",
      fontWeight: "500",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "1px solid #007BFF",
      backgroundColor: "#f0f8ff",
    }}
  >
    Signup
  </Link>

  <Link
    to="/user/forgot-password"
    style={{
      textDecoration: "none",
      color: "#007BFF",
      margin: "5px",
      fontSize: "16px",
      fontWeight: "500",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "1px solid #007BFF",
      backgroundColor: "#f0f8ff",
    }}
  >
    Forgot Password
  </Link>
</div>
</div>
  );
};

export default Login;
