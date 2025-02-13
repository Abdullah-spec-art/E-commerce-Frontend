import React from 'react'
import { useState,useEffect } from 'react';

const UseFetch = () => {

  const accesstoken= localStorage.getItem("access_token");
    
    useEffect(() => {
            if (!accesstoken) {
              navigate("/"); 
            }
          }, [accesstoken, navigate]);
  return (
    <div>
      
    </div>
  )
}

export default UseFetch
