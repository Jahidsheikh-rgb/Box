import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { dummyUsers } from "../Components/Common/dummyUsers";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, loginWithDummy, googleLogin } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // 1. Check Dummy Data First
      const dummyMatch = dummyUsers.find(
        (u) => u.email.toLowerCase() === data.email.toLowerCase() && 
               u.password === data.password
      );

      if (dummyMatch) {
        loginWithDummy(dummyMatch);
        toast.success(`Welcome back, ${dummyMatch.role}!`);
        handleRedirect(dummyMatch.role);
        return; // Exit early
      }

      // 2. If no dummy match, try Firebase
      await loginUser(data.email, data.password);
      toast.success("Login Successful!");
      navigate(location?.state?.from?.pathname || "/");

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = (role) => {
    const from = location.state?.from?.pathname;
    if (from) return navigate(from);

    const routes = {
      admin: "/admin",
      moderator: "/moderator",
      authority: "/authority",
    };
    navigate(routes[role] || "/user-dashboard");
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await googleLogin();
      toast.success("Google Login Successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 bg-green-600 items-center justify-center">
        <img src="/register-illustration.png" alt="Login" className="w-3/4" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <div className="flex bg-green-100 rounded-full mb-6 p-1">
            <button className="w-1/2 py-2 bg-green-600 text-white rounded-full">Login</button>
            <button onClick={() => navigate("/register")} className="w-1/2 py-2 text-gray-600">Sign Up</button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className={`w-full input input-bordered ${errors.email ? "input-error" : ""}`}
              {...register("email", { required: "Email is required" })}
            />
            <input
              type="password"
              placeholder="Password"
              className={`w-full input input-bordered ${errors.password ? "input-error" : ""}`}
              {...register("password", { required: "Password is required" })}
            />
            <button disabled={loading} className="w-full btn btn-success text-white">
              {loading ? <span className="loading loading-spinner"></span> : "Login"}
            </button>
          </form>

          <div className="divider">OR</div>
          
          <div className="flex justify-center gap-4">
            <button onClick={handleGoogleLogin} className="btn btn-outline btn-circle"><FaGoogle /></button>
            <button className="btn btn-outline btn-circle"><FaFacebookF /></button>
          </div>
          
          <p className="text-center mt-6">
            New here? <Link to="/register" className="text-green-600 font-bold">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;