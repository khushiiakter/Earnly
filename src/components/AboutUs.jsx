import que from "../assets/Questions-amico.png"
const AboutUs = () => {
  return (
    <section className="bg-gray-50 py-16">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-12">
      {/* Left Section: Image/Illustration */}
      <div className="flex justify-center">
        <img
          src={que}
          alt="Why Choose Us"
          className="w-full max-w-md"
        />
      </div>

      {/* Right Section: Content */}
      <div>
        <h3 className="text-[#5f1a89] text-lg font-semibold uppercase mb-4">
          Why Choose Us
        </h3>
        <h2 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
          Your Trusted Platform for Micro Tasking and Earning
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Earnly provides a seamless and transparent platform for users to complete micro tasks and earn money. Whether you're a Worker looking to earn rewards, a Buyer managing tasks and payments, or an Admin overseeing platform operations, Earnly offers a user-friendly experience for everyone.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <li className="flex items-center">
            <span className="bg-green-100  p-2 rounded-full mr-3">
              
            </span>
            <p className="text-gray-700">Seamless Task Management</p>
          </li>
          <li className="flex items-center">
            <span className="bg-green-100  p-2 rounded-full mr-3">
             
            </span>
            <p className="text-gray-700">Secure Payments and Withdrawals</p>
          </li>
          <li className="flex items-center">
            <span className="bg-green-100  p-2 rounded-full mr-3">
              
            </span>
            <p className="text-gray-700">User-Friendly Interface</p>
          </li>
          <li className="flex items-center">
            <span className="bg-green-100 p-2 rounded-full mr-3">
              
            </span>
            <p className="text-gray-700">Verified User Feedback</p>
          </li>
        </ul>
        <button className="bg-[#5f1a89] text-white px-6 py-3 rounded-lg hover:bg-[#5e2085] transition">
          Learn More
        </button>
      </div>
    </div>
  </section>
  );
};

export default AboutUs;
