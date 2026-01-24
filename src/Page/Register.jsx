import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const { registerUser, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // 1. Upload image to ImgBB
      let photoURL = "";
      if (data.photo?.[0]) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);
        try {
          // Replace with your actual API key if this one expires
          const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=ec638d6b6eabd0cb20b266acfa06c403`,
            formData
          );
          photoURL = res.data.data.display_url;
        } catch (imgErr) {
          console.error("Image Upload Failed", imgErr);
        }
      }

      // 2. Firebase Registration
      const result = await registerUser(data.email, data.password);

      // 3. Update Profile & Navigate
      if (result?.user) {
        await updateUserProfile(data.name, photoURL);
        toast.success("Registration Successful! Welcome Home.");
        
        // Navigate to intended page or Home, and replace history
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      }
      
    } catch (err) {
      console.error("Registration Error Code:", err.code);

      // Specific Error Handling for "Email Already In Use"
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Redirecting to Login...");
        // Auto-redirect to login after 2 seconds
        setTimeout(() => navigate("/login"), 2000);
      } 
      else if (err.code === "auth/weak-password") {
        toast.error("Password is too weak. Please use at least 6 characters.");
      } 
      else if (err.code === "auth/invalid-email") {
        toast.error("The email address is badly formatted.");
      }
      else {
        toast.error(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await googleLogin();
      toast.success("Logged in with Google!");
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-base-200">
      {/* Left Decoration */}
      <div className="hidden lg:flex w-1/2 bg-green-600 items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <h1 className="text-5xl font-bold mb-6">UniBox</h1>
          <p className="text-xl opacity-90 italic">"Join the most transparent community platform today."</p>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          </div>

          <div className="grid grid-cols-2 bg-gray-100 rounded-2xl p-1 mb-8">
            <button onClick={() => navigate("/login")} className="py-2 text-gray-500 font-medium">Login</button>
            <button className="py-2 bg-white text-green-600 font-bold rounded-xl shadow-sm">Sign Up</button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className={`input input-bordered w-full focus:input-success ${errors.name && 'input-error'}`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}

            <input
              type="email"
              placeholder="Email address"
              className={`input input-bordered w-full focus:input-success ${errors.email && 'input-error'}`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}

            <div className="form-control w-full">
              <label className="label py-0"><span className="label-text-alt text-gray-400">Profile Photo</span></label>
              <input type="file" className="file-input file-input-bordered file-input-success w-full" {...register("photo")} />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`input input-bordered w-full focus:input-success ${errors.password && 'input-error'}`}
                {...register("password", { 
                  required: "Password required",
                  minLength: { value: 6, message: "Min 6 characters" }
                })}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-400"
              >
                {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
              </button>
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            <button 
              disabled={loading} 
              className="btn btn-success w-full text-white mt-4 font-bold text-lg"
            >
              {loading ? <span className="loading loading-spinner"></span> : "Create Account"}
            </button>
          </form>

          <div className="divider text-gray-400 text-xs mt-8">OR SIGN UP WITH</div>

          <div className="flex gap-4 mt-4">
            <button onClick={handleGoogleLogin} className="btn btn-outline flex-1 gap-2 border-gray-200">
              <FaGoogle className="text-red-500" /> Google
            </button>
            <button className="btn btn-outline flex-1 gap-2 border-gray-200">
              <FaFacebookF className="text-blue-600" /> Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;