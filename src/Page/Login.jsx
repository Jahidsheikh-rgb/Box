import { useForm } from "react-hook-form";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 bg-green-600 items-center justify-center">
        <img
          src="/register-illustration.png"
          alt="Login Illustration"
          className="w-3/4"
        />
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Login to your account
          </h2>

          {/* Toggle */}
          <div className="flex bg-green-100 rounded-full mb-6">
            <button
              onClick={() => navigate("/login")}
              className="w-1/2 py-2 text-sm bg-green-600 text-white rounded-full"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="w-1/2 py-2 text-sm text-gray-600"
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full input input-bordered"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
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
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="text-center my-4 text-sm text-gray-500">
            or continue with
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-4">
            <button className="btn btn-outline btn-circle">
              <FaGoogle />
            </button>
            <button className="btn btn-outline btn-circle">
              <FaFacebookF />
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center mt-6 text-sm">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-green-600 font-semibold"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
