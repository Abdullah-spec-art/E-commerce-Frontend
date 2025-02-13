import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer",  
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate= useNavigate();



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/user/signup", formData);
        setIsLoading(false);
        alert(response.data.message);
        localStorage.setItem("email", formData.email)
        navigate("/user/verify-otp?page=/");
    }catch (err) {
      if(err.response){
        setError(err.response.data.detail);
        setIsLoading(false);
      }
    }
  };
  

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={handleInputChange}
          style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
          required
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
          required
        />
        
        {/* Role Selection Dropdown */}
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
          required
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>

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
            Register
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

      {/* Display error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display success message */}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default Signup;
