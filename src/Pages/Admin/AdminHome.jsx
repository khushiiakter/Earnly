import { useEffect, useState } from "react";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AdminHome = () => {
  const [stats, setStats] = useState({});
  const [withdrawals, setWithdrawals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [statsRes, withdrawalsRes] = await Promise.all([
          axiosSecure.get("/admin/stats"),
          axiosSecure.get("/withdrawals"),
        ]);
        setStats(statsRes.data);
        setWithdrawals(withdrawalsRes.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdminData();
  }, [axiosSecure]);

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/withdrawals/${id}`);
      setWithdrawals((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error approving withdrawal:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="admin-home-page p-6 bg-gray-100 min-h-screen">
      <Helmet>
        <title>Admin Home - Earnly</title>
      </Helmet>
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Admin Dashboard
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="p-4 bg-white shadow-md rounded-md text-center">
          <h2 className="text-xl font-medium text-gray-700">Total Workers</h2>
          <p className="text-2xl font-bold text-[#5f1a89]">
            {stats.totalWorkers}
          </p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-md text-center">
          <h2 className="text-xl font-medium text-gray-700">Total Buyers</h2>
          <p className="text-2xl font-bold text-[#5f1a89]">
            {stats.totalBuyers}
          </p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-md text-center">
          <h2 className="text-xl font-medium text-gray-700">Total Coins</h2>
          <p className="text-2xl font-bold text-[#5f1a89]">
            {stats.totalCoins}
          </p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-md text-center">
          <h2 className="text-xl font-medium text-gray-700">Total Payments</h2>
          <p className="text-2xl font-bold text-[#5f1a89]">
            {stats.totalPayments}
          </p>
        </div>
      </div>

      {/* Withdrawal Requests Section */}
      <div className="bg-white p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Pending Withdrawals
        </h2>
        {withdrawals.length === 0 ? (
          <p className="text-center text-gray-500">
            No withdrawal requests found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                    Email
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                    Amount
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((withdrawal) => (
                  <tr
                    key={withdrawal._id}
                    className="bg-white hover:bg-gray-50"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {withdrawal.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {withdrawal.amount}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleApprove(withdrawal._id)}
                        className="bg-[#5f1a89] text-white px-4 py-2 rounded hover:bg-[#9548c5] transition"
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
