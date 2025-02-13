import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = localStorage.getItem("email");
  const page=searchParams.get("page");
  console.log(searchParams.get("page"))

  useEffect(() => { 
    if (!email) {
       navigate("/"); 
    }
   }, [email]);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.trim() === "") {
      setMessage("Please enter the OTP.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/user/verify-otp",
        { email: email, otp }
      );
      setMessage(response.data.message);
      setIsLoading(false);
      alert(response.data.message);
      if (page==='/') {
        localStorage.removeItem("email");
        navigate("/");
      }else if(page==='new-password'){
        navigate("/user/new-password");
      }
      else {
        console.log("No email or email1 found, navigating to /");
        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
      setMessage(error.response.data.detail);
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
    >
      <h2>Verify OTP</h2>
      <p>Please enter the OTP sent to your email.</p>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <form onSubmit={handleVerifyOtp}>
        <input
          type="text"
          value={otp}
          onChange={handleOtpChange}
          placeholder="Enter OTP"
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "100%",
            marginBottom: "10px",
          }}
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
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default OTPVerification;
