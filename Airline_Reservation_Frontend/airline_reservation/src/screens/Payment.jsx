import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract query params from URL
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const amount = queryParams.get("amount");
  const seatId = queryParams.get("seatId");

  // Retrieve flightId from sessionStorage
  const [flightId, setFlightId] = useState("");

  useEffect(() => {
    const storedFlight = JSON.parse(sessionStorage.getItem("selectedFlight"));
    if (storedFlight && storedFlight.id) {
      setFlightId(storedFlight.id);
    } else {
      console.error("⚠ Flight ID not found in session storage!");
    }
  }, []);

  const [paymentMethod, setPaymentMethod] = useState("CREDITCARD");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const passengerId = sessionStorage.getItem("passengerId");
  const flightid = sessionStorage.getItem("flightId");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setLoading(true);

    if (!cardNumber || !expiryDate || !cvv) {
      setFormError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Book the Flight and Seat
      const bookingData = {
        passengerId: passengerId,
        flightId: flightId,
        seatId: seatId,
        bookingDate: new Date().toISOString().split("T")[0], // Today's date
        status: "CONFIRMED",
      };

      const bookingResponse = await fetch(
        "http://localhost:8080/booking/bookSeat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );

      if (!bookingResponse.ok) {
        throw new Error("Booking failed.");
      }

      const bookingResult = await bookingResponse.json();
      console.log("Booking Successful:", bookingResult);

      // Step 2: Process Payment
      const paymentData = {
        amount: parseFloat(amount),
        paymentMethod,
        booking: bookingResult.bookingId, // Get the newly created booking ID
        flightId: flightId,
        seatId: seatId,
      };

      const paymentResponse = await fetch(
        "http://localhost:8080/payment/process",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentData),
        }
      );

      if (!paymentResponse.ok) {
        throw new Error("Payment failed.");
      }

      const paymentResult = await paymentResponse.json();
      console.log("Payment Successful:", paymentResult);

      alert("✅ Payment Successful!");
      navigate("/success");
    } catch (error) {
      console.error("Error during booking/payment:", error);
      setFormError("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email:</label>
          <input
            type="text"
            value={email}
            readOnly
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Amount:</label>
          <input
            type="text"
            value={amount}
            readOnly
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Flight ID:</label>
          <input
            type="text"
            value={flightid}
            readOnly
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="CREDITCARD">Credit Card</option>
            <option value="DEBITCARD">Debit Card</option>
            <option value="PAYPAL">PayPal</option>
            <option value="UPI">UPI</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">
            Expiry Date (MM/YY):
          </label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">CVV:</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {formError && <div className="text-red-500 mb-4">{formError}</div>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
