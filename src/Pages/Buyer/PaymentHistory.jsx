import { useEffect, useState } from "react";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const [paymentHistory, setPaymentHistory] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/payments')
            .then(res => setPaymentHistory(res.data))
            .catch(err => console.error(err));
    }, [axiosSecure]);

    return (
        <div>
            <h2 className="text-xl font-bold">Payment History</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Transaction ID</th>
                        <th>Coins</th>
                        <th>Amount ($)</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentHistory.map((payment, index) => (
                        <tr key={index}>
                            <td>{new Date(payment.date).toLocaleDateString()}</td>
                            <td>{payment.transactionId}</td>
                            <td>{payment.coins}</td>
                            <td>{payment.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;