import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import error from "../assets/404 Error-rafiki.png";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-2">
      <Helmet>
        <title>Error - Earnly</title>
      </Helmet>

      {/* Error Image */}
      <img
        src={error}
        alt="404 Error"
        className="h-[70%]   max-w-md md:max-w-lg lg:max-w-xl animate-fade-in"
      />

      {/* Message */}
      <p className="text-xl md:text-2xl font-semibold text-gray-700 mt-2">
        Oops! The page you're looking for doesn't exist.
      </p>
      {/* Back Home Button */}
      <Link
        to="/"
        className="mt-2 px-5 py-2 text-lg font-medium text-white bg-[#5f1a89] rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-[#4a126a]"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
