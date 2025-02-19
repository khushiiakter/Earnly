import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";


const Withdrawals = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();

 // State to handle the withdrawal form
 const [withdrawCoin, setWithdrawCoin] = useState(0);
 const [withdrawAmount, setWithdrawAmount] = useState(0);
 const [paymentSystem, setPaymentSystem] = useState("");
 const [accountNumber, setAccountNumber] = useState("");
 const [isLoading, setIsLoading] = useState(false);

 // Fetch user data from AuthContext
 const { coins } = user; // Assuming coins are available in the context

 // Handle coin change and calculate withdrawal amount in dollars
 useEffect(() => {
     setWithdrawAmount(withdrawCoin / 20); // Convert coins to dollars
 }, [withdrawCoin]);

 // Handle withdrawal submission
 const handleWithdrawal = async () => {
     if (withdrawCoin > coins) {
         toast.error("Insufficient coins to withdraw.");
         return;
     }

     if (withdrawCoin < 200) {
         toast.error("Minimum 200 coins required to withdraw.");
         return;
     }

     setIsLoading(true);

     try {
         const withdrawalData = {
             worker_email: user.email,
             worker_name: user.name,
             withdrawal_coin: withdrawCoin,
             withdrawal_amount: withdrawAmount,
             payment_system: paymentSystem,
             account_number: accountNumber,
             withdraw_date: new Date(),
             status: "pending",
         };

         const response = await axiosSecure.post("/withdrawals", withdrawalData);
         toast.success("Withdrawal request has been submitted.");
         setWithdrawCoin(0); // Reset form
         setAccountNumber("");
         setPaymentSystem("");
     } catch (error) {
         toast.error("Error submitting withdrawal request.");
     } finally {
         setIsLoading(false);
     }
 };

 return (
    <div className="withdrawal-page">
        <div className="max-w-4xl mx-auto mt-10  shadow-lg rounded-lg p-6">
            <h2 className="text-3xl font-semibold text-center mb-8 ">Request Withdrawal</h2>
            
            <div className="mb-6 flex justify-between items-center">
                <div className="flex flex-col items-center">
                    <p className="text-lg font-medium ">Total Coins</p>
                    <span className="text-xl font-semibold text-blue-600">{coins}</span>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-lg font-medium ">Withdrawable Amount</p>
                    <span className="text-xl font-semibold text-blue-600">${coins / 20}</span>
                </div>
            </div>

            <div className=" p-6 rounded-lg shadow-sm">
                <label className="block text-lg font-medium ">Coin to Withdraw</label>
                <input
                    type="number"
                    value={withdrawCoin}
                    onChange={(e) => setWithdrawCoin(Number(e.target.value))}
                    max={coins}
                    className="w-full p-3 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <label className="block text-lg font-medium  mt-4">Withdraw Amount ($)</label>
                <input
                    type="text"
                    value={withdrawAmount}
                    readOnly
                    className="w-full p-3 mt-2 rounded-lg border border-gray-300 cursor-not-allowed"
                />

                <label className="block text-lg font-medium  mt-4">Select Payment System</label>
                <select
                    value={paymentSystem}
                    onChange={(e) => setPaymentSystem(e.target.value)}
                    className="w-full p-3 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="Bkash">Bkash</option>
                    <option value="Rocket">Rocket</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Other">Other</option>
                </select>

                <label className="block text-lg font-medium  mt-4">Account Number</label>
                <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full p-3 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {withdrawCoin > coins && (
                    <p className="text-red-500 mt-2">Insufficient coin</p>
                )}

                <div className="mt-6">
                    <button
                        onClick={handleWithdrawal}
                        disabled={withdrawCoin <= 0 || withdrawCoin > coins || withdrawCoin < 200 || isLoading}
                        className={`w-full p-3 rounded-lg font-semibold text-white ${
                            withdrawCoin <= 0 || withdrawCoin > coins || withdrawCoin < 200 || isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#5f1a89] hover:bg-[#0F1035] "
                        }`}
                    >
                        {isLoading ? "Processing..." : "Request Withdrawal"}
                    </button>
                </div>
            </div>
        </div>
    </div>
);
};

export default Withdrawals;