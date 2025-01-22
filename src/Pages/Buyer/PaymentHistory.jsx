import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axiosSecure.get(`/payments/${user.email}`);
                const sortedPayments = response.data.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                ); // Sort by date (latest first)
                setPayments(sortedPayments);
            } catch (error) {
                console.error("Failed to fetch payment history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [user.email, axiosSecure]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h3 className="text-2xl font-bold text-center mb-6">Payment History</h3>
            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                                <th className="border border-gray-200 px-4 py-2">Date</th>
                                <th className="border border-gray-200 px-4 py-2">Coins Purchased</th>
                                <th className="border border-gray-200 px-4 py-2">Amount</th>
                                <th className="border border-gray-200 px-4 py-2">Transaction ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr
                                    key={payment.transactionId}
                                    className={`${
                                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } hover:bg-gray-100`}
                                >
                                    <td className="border border-gray-200 px-4 py-2 text-center">
                                        {new Date(payment.date).toLocaleDateString()}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2 text-center">
                                        {payment.coins}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2 text-center text-green-600 font-bold">
                                        ${payment.amount}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2 text-center">
                                        {payment.transactionId}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;