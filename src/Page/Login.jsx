import { useForm } from "react-hook-form";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { dummyUsers } from "../Components/Common/dummyUsers";
import { useAuth } from "../Context/AuthContext"; // make sure this exists

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // get login function from AuthContext

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // check if user exists in dummy users
    const user = dummyUsers.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (!user) {
      toast.error("Invalid email or password");
      return;
    }

    // save user to context
    login(user);
    toast.success("Login successful!");

    // redirect based on role
    switch (user.role) {
      case "admin":
        navigate("/admin");
        break;
      case "moderator":
        navigate("/moderator");
        break;
      case "authority":
        navigate("/authority");
        break;
      default:
        navigate("/user-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side Illustration */}
      <div className="hidden md:flex w-1/2 bg-green-600 items-center justify-center">
        <img
          src="/register-illustration.png"
          alt="Login Illustration"
          className="w-3/4"
        />
      </div>

      {/* Right Side Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Login to your account
          </h2>

          {/* Toggle Login/Register */}
          <div className="flex bg-green-100 rounded-full mb-6">
            <button className="w-1/2 py-2 bg-green-600 text-white rounded-full">
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="w-1/2 py-2 text-gray-600"
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full input input-bordered"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full input input-bordered"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
            >
              Login
            </button>
          </form>

          {/* Social Login Buttons */}
          <div className="text-center my-4 text-sm text-gray-500">
            or continue with
          </div>
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
            <Link to="/register" className="text-green-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
