import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  async function handleResetPassword() {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        { password, confirmPassword }
      );

      if (response.data.status === "success") {
        localStorage.removeItem("resetToken"); // Remove stored token
        navigate("/login"); // Redirect to login page
      }
    } catch (error) {
      setApiError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-3xl text-emerald-600">Reset Password</h1>
      <hr className="my-4" />

      <div className="max-w-md mx-auto my-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full px-4 py-2 border rounded"
          placeholder="Enter New Password"
        />
        
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="block w-full px-4 py-2 border rounded mt-2"
          placeholder="Confirm New Password"
        />

        {apiError && <p className="text-red-600">{apiError}</p>}

        <button
          onClick={handleResetPassword}
          className="btn mt-3"
          disabled={isLoading}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </>
  );
}
