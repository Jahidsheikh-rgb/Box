import { useForm } from "react-hook-form";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/image.png";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Role logic: checkbox = authority, else user
      const role = data.admin ? "authority" : "user";

      // Call backend API
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          photo: data.photo,
          role,
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Registration failed");

      // Save JWT in localStorage
      localStorage.setItem("token", result.token);

      // Redirect based on role
      if (role === "authority") navigate("/authority-dashboard");
      else navigate("/user-dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Image */}
      <div className="hidden md:flex w-1/2 bg-green-600 items-center justify-center">
        <img src={img} alt="Register" className="w-3/4 rounded-lg" />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Account
          </h2>

          {/* Toggle Buttons */}
          <div className="flex bg-green-100 rounded-full mb-6">
            <button
              onClick={() => navigate("/login")}
              className="w-1/2 py-2 text-sm text-gray-600 rounded-full hover:bg-green-50"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="w-1/2 py-2 text-sm bg-green-600 text-white rounded-full"
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full input input-bordered"
                {...register("name", { required: "Full name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full input input-bordered"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Photo URL */}
            <div>
              <input
                type="text"
                placeholder="Photo URL"
                className="w-full input input-bordered"
                {...register("photo", { required: "Photo URL is required" })}
              />
              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full input input-bordered"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Checkbox for authority */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="checkbox checkbox-success"
                {...register("admin")}
              />
              Register as Authority
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold mt-2"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="text-center my-4 text-sm text-gray-500">or continue with</div>

          {/* Social Login */}
          <div className="flex justify-center gap-4">
            <button className="btn btn-outline btn-circle">
              <FaGoogle />
            </button>
            <button className="btn btn-outline btn-circle">
              <FaFacebookF />
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
