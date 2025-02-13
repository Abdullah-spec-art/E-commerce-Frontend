import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Forgetpass = () => {
    const [email,setEmail]=useState("");
    const [isLoading,setIsLoading]= useState(false);
    const [error, setError]=useState("");
    const [message,setMessage]=useState(""); 
    const navigate=useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setIsLoading(true);

        try{
            const response=await axios.post("http://127.0.0.1:8000/user/forgot-password", { email });
            setMessage(response.data.message);
            setIsLoading(false);
            alert(response.data.message)
            localStorage.setItem("email", email);
            navigate("/user/verify-otp?page=new-password")
        }catch(err){
            if (err.response){
                setError(err.response.data.detail)
                setIsLoading(false)
            }else{
                setError('An error occurred. Please try again later.');
                setIsLoading(false);
            }
        }
    };


  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Forget Password</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            Submit
          </button>
        )}
        {isLoading && (
          <button
            disabled
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
    </div>
  );
};


export default Forgetpass
