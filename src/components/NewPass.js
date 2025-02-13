import { useState,useEffect } from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewPass = () => {
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const email = localStorage.getItem("email");

    useEffect(() => {
        if (!email) {
          navigate("/"); 
        }
      }, [email, navigate]);

    const handlepasswordchange=(e)=>{
        setPassword(e.target.value)
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (password.trim() === "") {
          setMessage("Please enter a new password.");
          return;
        }
    
        setIsLoading(true);
        try {
          const response = await axios.post("http://127.0.0.1:8000/user/new-password", {
            email: email,
            password,
          }); 
          console.log("Success:", response.data.message);
          setMessage(response.data.message);
          setIsLoading(false);
          alert(response.data.message)
          localStorage.removeItem("email");
          
          navigate("/")

        } catch (err) {
          setIsLoading(false);
          setMessage(err.response.data.detail);
        }
      };



  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Set New Password</h2>
      <p>Please enter your new password</p>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <form onSubmit={handleFormSubmit}>
      <input
        type="password"
        value={password}
        onChange={handlepasswordchange}
        placeholder="Enter new password"
        style={{ padding: "10px", fontSize: "16px", width: "100%", marginBottom: "10px" }}
      />
      <button
        type="submit"
        disabled={isLoading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isLoading ? "Verifying..." : "Change"}
      </button>
      </form>
    </div>
  )
}

export default NewPass
