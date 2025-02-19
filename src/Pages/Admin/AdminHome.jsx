import { useEffect, useState } from "react";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

  // Prepare data for the chart (Ensure all values exist)
  const chartData = [
    { name: "Workers", value: stats.totalWorkers || 0 },
    { name: "Buyers", value: stats.totalBuyers || 0 },
    { name: "Coins", value: stats.totalCoins || 0 },
    { name: "Payments", value: stats.totalPayments || 0 },
  ];

  console.log("Chart Data:", chartData); // Debugging check

  return (
    <div className="admin-home-page p-6 min-h-screen">
      <Helmet>
        <title>Admin Home - Earnly</title>
      </Helmet>
      <h1 className="text-3xl font-semibold text-center mb-8">
        Admin Dashboard
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="p-4 shadow-md rounded-md text-center">
          <h2 className="text-xl font-medium">Total Workers</h2>
          <p className="text-2xl font-bold text-[#5f1a89]">
            {stats.totalWorkers || 0}
          </p>
        </div>
        <div className="p-4 shadow-md rounded-md text-center">
          <h2 className="text-xl font-medium">Total Buyers</h2>
          <p className="text-2xl font-bold text-[#5f1a89]">
            {stats.totalBuyers || 0}
          </p>
        </div>
        <div className="p-4 shadow-md rounded-md text-center">
          <h2 className="text-xl font-medium">Total Coins</h2>
          <p className="text-2xl font-bold text-[#5f1a89]">
            {stats.totalCoins || 0}
          </p>
        </div>
        <div className="p-4 shadow-md rounded-md text-center">
          <h2 className="text-xl font-medium">Total Payments</h2>
          <p className="text-2xl font-bold text-[#5f1a89]">
            {stats.totalPayments || 0}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-6 shadow-md rounded-md bg-white mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Platform Overview
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis domain={[0, "auto"]} />
            <Tooltip />
            <Bar dataKey="value" fill="#5f1a89" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Withdrawal Requests Section */}
      <div className="p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Pending Withdrawals</h2>
        {withdrawals.length === 0 ? (
          <p className="text-center">No withdrawal requests found.</p>
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
                    <td className="border text-white border-gray-300 px-4 py-2">
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
