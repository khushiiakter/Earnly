import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const coinPackages = [
    { coins: 10, price: 1 },
    { coins: 150, price: 10 },
    { coins: 500, price: 20 },
    { coins: 1000, price: 35 },
];

const PurchaseCoin = () => {
    const [selectedCoins, setSelectedCoins] = useState(null);

    const handleSelectPackage = (packageDetails) => {
        const confirmPurchase = window.confirm(
            `Are you sure you want to purchase ${packageDetails.coins} coins for $${packageDetails.price}?`
        );
        if (confirmPurchase) {
            setSelectedCoins(packageDetails);
        }
    };

    if (!stripePromise) {
        return (
            <div className="purchase-coin">
                <h2 className="text-xl font-bold text-red-600">
                    Failed to initialize Stripe. Please try again later.
                </h2>
            </div>
        );
    }

    return (
        <div className="purchase-coin p-4">
            <h2 className="text-2xl font-bold text-center mb-6">Purchase Coins</h2>
            <div className="coin-packages grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {coinPackages.map((pkg, index) => (
                    <div
                        key={index}
                        className={`coin-package-card border p-4 cursor-pointer rounded-lg shadow-md hover:shadow-lg transition ${
                            selectedCoins?.coins === pkg.coins ? "bg-green-100 border-green-600" : ""
                        }`}
                        onClick={() => handleSelectPackage(pkg)}
                        aria-label={`Purchase ${pkg.coins} Coins for $${pkg.price}`}
                    >
                        <p className="text-lg font-semibold">{pkg.coins} Coins</p>
                        <p className="text-green-600 font-bold">${pkg.price}</p>
                    </div>
                ))}
            </div>
            <div className="checkout-section mt-6">
                {selectedCoins ? (
                    <Elements stripe={stripePromise}>
                        <CheckoutForm selectedCoins={selectedCoins} />
                    </Elements>
                ) : (
                    <p className="text-gray-600 italic text-center">
                        Please select a coin package to proceed with payment.
                    </p>
                )}
            </div>
        </div>
    );
};

export default PurchaseCoin;