import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {
  let navigate = useNavigate();
  const [resetCode, setResetCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  async function handleVerifyCode() {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        { resetCode }
      );

      if (response.data.status === "success") {
        navigate("/resetPassword"); // Navigate to Reset Password page
      }
    } catch (error) {
      setApiError(error.response?.data?.message || "Invalid reset code");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-emerald-600">Verify Reset Code</h1>
      <hr className="my-4" />

      <div className="max-w-md mx-auto my-4">
        <input
          type="text"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-stone-800 peer"
          placeholder="Enter Reset Code"
        />
        
        {apiError && <p className="text-red-600">{apiError}</p>}

        <button
          onClick={handleVerifyCode}
          className="btn mt-3"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </button>
      </div>
    </>
  );
}
