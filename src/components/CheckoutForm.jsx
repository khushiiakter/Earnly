import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = ({ selectedCoins }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (!stripe || !elements) {
            setErrorMessage("Stripe is not initialized. Please try again later.");
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            setErrorMessage("Card details not entered. Please try again.");
            return;
        }

        setIsLoading(true);

        try {
            // Replace the following API call with your backend's payment intent creation route
            const response = await fetch("http://localhost:5000/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: selectedCoins.price * 100, // Amount in cents
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create payment intent. Please try again.");
            }

            const { clientSecret } = await response.json();

            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: "Test User", // Replace with dynamic data if needed
                    },
                },
            });

            if (error) {
                throw new Error(error.message);
            }

            if (paymentIntent?.status === "succeeded") {
                setSuccessMessage(`Payment successful! You have purchased ${selectedCoins.coins} coins.`);
            } else {
                setErrorMessage("Payment failed. Please try again.");
            }
        } catch (error) {
            setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="checkout-form border p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4 text-center">Complete Your Payment</h3>
            {errorMessage && (
                <div className="error-message text-red-600 mb-4 text-center">
                    {errorMessage}
                </div>
            )}
            {successMessage && (
                <div className="success-message text-green-600 mb-4 text-center">
                    {successMessage}
                </div>
            )}
            {!successMessage && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Card Details</label>
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: "16px",
                                        color: "#32325d",
                                        fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                                        "::placeholder": { color: "#aab7c4" },
                                    },
                                    invalid: {
                                        color: "#fa755a",
                                        iconColor: "#fa755a",
                                    },
                                },
                            }}
                            className="p-2 border rounded-lg"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!stripe || isLoading}
                        className={`w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg ${
                            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
                        }`}
                    >
                        {isLoading ? "Processing..." : `Pay $${selectedCoins.price}`}
                    </button>
                </form>
            )}
        </div>
    );
};

export default CheckoutForm;