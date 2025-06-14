import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Reset() {
  const { token } = useParams(); // Get token from route
  const [form, setForm] = useState({ password: "", confirmpass: "" });
    const navigate=useNavigate();
  useEffect(() => {
    console.log("Token from URL:", token);
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const BACKEND = import.meta.env.VITE_BACKEND_URL;
    console.log(BACKEND, "backend");
    console.log("Submitted Passwords:", form.password, form.confirmpass);

    try {
      const res = await axios.put(
        `${BACKEND}/reset/password/${token}`,
        { password: form.password, confirmpassword: form.confirmpass }
      );
      toast.success("Password reset successful!");
      navigate("/login");
      // Optionally reset form or redirect user here
    } catch (error) {
      // Extract error message from response or fallback
      const errorMsg = error.response?.data?.error || "Something went wrong";
      toast.error(errorMsg);
      
    }
  };

  return (
    <div className="p-4 px-5">
      {/* ToastContainer to show toasts */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmpass"
            required
            value={form.confirmpass}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer !bg-purple-600 hover:!bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Set password
        </button>
      </form>
    </div>
  );
}

export default Reset;
