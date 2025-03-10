// import React, { useState } from "react";

// const PaymentForm = ({ onPaymentSuccess }) => {
//   const [amount, setAmount] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("CREDITCARD");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [formError, setFormError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError("");

//     // Client-Side Validation
//     if (!amount || !cardNumber || !expiryDate || !cvv) {
//       setFormError("Please fill in all required fields.");
//       return;
//     }

//     const paymentData = {
//       amount,
//       paymentMethod,
//       cardNumber,
//       expiryDate,
//       cvv,
//     };

//     try {
//       const apiUrl = "http://localhost:8080/payment/process"; // Update with your payment API endpoint
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(paymentData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         onPaymentSuccess(data); // Notify parent component of successful payment
//         alert("Payment Successful!");
//       } else {
//         setFormError("Payment failed. Please try again.");
//       }
//     } catch (error) {
//       setFormError(`Error processing payment: ${error.message}`);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="payment-form-container">
//         <h2>Payment Information</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="amount">Amount:</label>
//             <input
//               type="number"
//               id="amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="paymentMethod">Payment Method:</label>
//             <select
//               id="paymentMethod"
//               value={paymentMethod}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             >
//               <option value="CREDITCARD">Credit Card</option>
//               <option value="DEBITCARD">Debit Card</option>
//               <option value="PAYPAL">PayPal</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="cardNumber">Card Number:</label>
//             <input
//               type="text"
//               id="cardNumber"
//               value={cardNumber}
//               onChange={(e) => setCardNumber(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="expiryDate">Expiry Date:</label>
//             <input
//               type="text"
//               id="expiryDate"
//               placeholder="MM/YY"
//               value={expiryDate}
//               onChange={(e) => setExpiryDate(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="cvv">CVV:</label>
//             <input
//               type="text"
//               id="cvv"
//               value={cvv}
//               onChange={(e) => setCvv(e.target.value)}
//               required
//             />
//           </div>

//           {formError && <div className="error-message">{formError}</div>}

//           <button type="submit">Pay Now</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PaymentForm;
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const PaymentForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Extract query params from URL
//   const queryParams = new URLSearchParams(location.search);
//   const email = queryParams.get("email");
//   const amount = queryParams.get("amount");
//   const flightId = queryParams.get("flightId");
//   const seatId = queryParams.get("seatId");

//   const [paymentMethod, setPaymentMethod] = useState("CREDITCARD");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [formError, setFormError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError("");

//     // Client-Side Validation
//     if (!cardNumber || !expiryDate || !cvv) {
//       setFormError("Please fill in all required fields.");
//       return;
//     }

//     const paymentData = {
//       amount,
//       paymentMethod,
//       cardNumber,
//       expiryDate,
//       cvv,
//     };

//     try {
//       const apiUrl = "http://localhost:8080/payment/process"; // Update with your backend API
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(paymentData),
//       });

//       if (response.ok) {
//         alert("Payment Successful!");
//         navigate("/success"); // Redirect to success page
//       } else {
//         setFormError("Payment failed. Please try again.");
//       }
//     } catch (error) {
//       setFormError(`Error processing payment: ${error.message}`);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2>Payment Information</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Email:</label>
//           <input type="text" value={email} readOnly />
//         </div>

//         <div className="form-group">
//           <label>Amount:</label>
//           <input type="text" value={amount} readOnly />
//         </div>

//         <div className="form-group">
//           <label>Payment Method:</label>
//           <select
//             value={paymentMethod}
//             onChange={(e) => setPaymentMethod(e.target.value)}
//           >
//             <option value="CREDITCARD">Credit Card</option>
//             <option value="DEBITCARD">Debit Card</option>
//             <option value="PAYPAL">PayPal</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Card Number:</label>
//           <input
//             type="text"
//             value={cardNumber}
//             onChange={(e) => setCardNumber(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Expiry Date:</label>
//           <input
//             type="text"
//             placeholder="MM/YY"
//             value={expiryDate}
//             onChange={(e) => setExpiryDate(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>CVV:</label>
//           <input
//             type="text"
//             value={cvv}
//             onChange={(e) => setCvv(e.target.value)}
//             required
//           />
//         </div>

//         {formError && <div className="error-message">{formError}</div>}

//         <button type="submit">Pay Now</button>
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;

// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const PaymentForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Extract query params from URL
//   const queryParams = new URLSearchParams(location.search);
//   const email = queryParams.get("email");
//   const amount = queryParams.get("amount");
//   const flightId = queryParams.get("flightId");
//   const seatId = queryParams.get("seatId");

//   const [paymentMethod, setPaymentMethod] = useState("CREDITCARD");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [formError, setFormError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError("");

//     if (!cardNumber || !expiryDate || !cvv) {
//       setFormError("Please fill in all required fields.");
//       return;
//     }

//     const paymentData = {
//       email,
//       amount,
//       paymentMethod,
//       flightId,
//       seatId,
//     };

//     try {
//       const apiUrl = "http://localhost:8080/payment/process";
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(paymentData),
//       });

//       if (response.ok) {
//         alert("Payment Successful!");
//         navigate("/success");
//       } else {
//         setFormError("Payment failed. Please try again.");
//       }
//     } catch (error) {
//       setFormError(`Error processing payment: ${error.message}`);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium">Email:</label>
//           <input
//             type="text"
//             value={email}
//             readOnly
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium">Amount:</label>
//           <input
//             type="text"
//             value={amount}
//             readOnly
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium">Payment Method:</label>
//           <select
//             value={paymentMethod}
//             onChange={(e) => setPaymentMethod(e.target.value)}
//             className="w-full p-2 border rounded"
//           >
//             <option value="CREDITCARD">Credit Card</option>
//             <option value="DEBITCARD">Debit Card</option>
//             <option value="PAYPAL">PayPal</option>
//             <option value="UPI">UPI</option>
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium">Card Number:</label>
//           <input
//             type="text"
//             value={cardNumber}
//             onChange={(e) => setCardNumber(e.target.value)}
//             required
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium">
//             Expiry Date (MM/YY):
//           </label>
//           <input
//             type="text"
//             value={expiryDate}
//             onChange={(e) => setExpiryDate(e.target.value)}
//             required
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium">CVV:</label>
//           <input
//             type="text"
//             value={cvv}
//             onChange={(e) => setCvv(e.target.value)}
//             required
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {formError && <div className="text-red-500 mb-4">{formError}</div>}

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded"
//         >
//           Pay Now
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;

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
        passengerId: 1, // TODO: Replace with actual passenger ID from session
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
            value={flightId}
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
