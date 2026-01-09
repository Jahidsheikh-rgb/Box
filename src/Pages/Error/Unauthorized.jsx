import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-600">403</h1>
      <p className="text-lg text-gray-600 mt-2">
        You do not have permission to access this page.
      </p>
      <Link
        to="/"
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
};

export default Unauthorized;
