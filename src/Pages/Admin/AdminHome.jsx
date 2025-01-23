import { useEffect, useState } from "react";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";

const AdminHome = () => {
    const [withdrawals, setWithdrawals] = useState([]);
    const [stats, setStats] = useState({
        totalWorkers: 0,
        totalEarnings: 0,
        pendingWithdrawals: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null); 
            try {
                const [statsResponse, withdrawalsResponse] = await Promise.all([
                    axiosSecure.get("/admin/stats"),
                    axiosSecure.get("/withdrawals"),
                ]);
                setStats(statsResponse.data);
                setWithdrawals(withdrawalsResponse.data);
            } catch (err) {
                setError("Failed to fetch data. Please try again.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [axiosSecure]);

    if (isLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-600">{error}</div>;
    }

    return (
        <div className="admin-home-page">
            <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
                    Admin Dashboard
                </h1>
                
                {/* Platform Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Render Stats */}
                </div>

                {/* Withdrawal Requests */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Recent Withdrawals
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-100">
                                {/* Table Headers */}
                            </thead>
                            <tbody>
                                {withdrawals.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center text-gray-500 py-4">
                                            No withdrawal requests found.
                                        </td>
                                    </tr>
                                ) : (
                                    withdrawals.map((withdrawal) => (
                                        <tr key={withdrawal.id} className="text-center">
                                            {/* Render Withdrawal Row */}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
