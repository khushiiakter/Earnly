import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
// import { AuthContext } from "../context/AuthProvider";  

const CheckoutForm = ({ selectedCoins }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user, setCoins,coins } = useContext(AuthContext);  
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const updateCoins = async (email, coins) => {
        try {
          const response = await axios.patch(`https://earnly-server.vercel.app/users/${email}`, { coins });
          if (response.status === 200) {
            setCoins(coins); // Update the state with the new coins
          }
        } catch (error) {
          console.error("Failed to update user coins:", error.response?.data?.message || error.message);
          setErrorMessage("Failed to update coins. Please try again.");
        }
      };
      

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
            // Create payment intent on the server
            const response = await fetch("https://earnly-server.vercel.app/api/create-payment-intent", {
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

            // Confirm the payment with Stripe
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: user.displayName || "Test User",  
                    },
                },
            });

            if (error) {
                throw new Error(error.message);
            }

            if (paymentIntent?.status === "succeeded") {
                setSuccessMessage(`Payment successful! You have purchased ${selectedCoins.coins} coins.`);

                // Save the payment info to the database
                await axios.post("https://earnly-server.vercel.app/payments", {
                    email: user.email,
                    amount: selectedCoins.price,
                    coins: selectedCoins.coins,
                    transactionId: paymentIntent.id,
                    date: new Date().toISOString(),
                });

                // Update the user's coins
                const newCoins = user.coins + selectedCoins.coins;
                updateCoins(user.email, newCoins);
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
