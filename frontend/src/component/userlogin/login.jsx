import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useSelector,useDispatch } from "react-redux";
import {registeruser, loginuser} from "../../redux/users/userslice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
const AuthPage = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [token,settoken]=useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
  
    if (isLogin) {
      const prevlink=localStorage.getItem("prevlocation");
      localStorage.removeItem("prevlocation");
      const result = await dispatch(loginuser(form));
      if (result.type === "auth/login/fulfilled") {
         const token=localStorage.getItem("token");
         settoken(token);
         if(prevlink){
          navigate(prevlink);
         }else{
        navigate("/");
         }
      }
    } else {
      const result = await dispatch(registeruser(form));
      if (result.type === "auth/register/fulfilled") {
        const token=localStorage.getItem("token");
         settoken(token);
        navigate("/");
        
      }
    }
  };
  

  const handleGoogleLogin = () => {
    // google logic here
    console.log("Google login clicked");
  };
 const handleforgot=()=>{
  const email=form.email;
  console.log(email);
  axios.post("http://localhost:8080/api/v1/password/forgot",{email});
  
  
 };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer !bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-purple-500 text-gray-700 py-2 rounded-lg transition duration-300"
          >
            <FaGoogle className="text-purple-700 mr-5"/>
            Continue with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
         <button onClick={handleforgot}>forgot?</button> 
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
