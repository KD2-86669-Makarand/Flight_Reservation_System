// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const PaymentForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Extract query params from URL
//   const queryParams = new URLSearchParams(location.search);
//   const email = queryParams.get("email");
//   const amount = queryParams.get("amount");
//   const seatId = queryParams.get("seatId");

//   // Retrieve flightId from sessionStorage correctly
//   const [flightId, setFlightId] = useState("");
//   const bookingId = sessionStorage.getItem("bookingId");

//   useEffect(() => {
//     const storedFlight = JSON.parse(sessionStorage.getItem("selectedFlight"));
//     if (storedFlight && storedFlight.flightId) {
//       setFlightId(storedFlight.flightId);
//     } else {
//       console.error("⚠ Flight ID not found in session storage!");
//     }
//   }, []);

//   const [paymentMethod, setPaymentMethod] = useState("CREDITCARD");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [formError, setFormError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const passengerId = sessionStorage.getItem("passengerId");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError("");
//     setLoading(true);

//     if (!cardNumber || !expiryDate || !cvv) {
//       setFormError("Please fill in all required fields.");
//       setLoading(false);
//       return;
//     }

//     try {
//       // Step 1: Book the Flight and Seat
//       const bookingData = {
//         passengerId: passengerId,
//         flightId: flightId,
//         seatId: seatId,
//         bookingDate: new Date().toISOString().split("T")[0], // Today's date
//         status: "CONFIRMED",
//       };

//       const bookingResponse = await fetch(
//         "http://localhost:8080/booking/bookSeat",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(bookingData),
//         }
//       );

//       if (!bookingResponse.ok) {
//         throw new Error("Booking failed.");
//       }
//       sessionStorage.setItem("bookingId", bookingId);
//       const bookingResult = await bookingResponse.json();
//       console.log("✅ Booking Result:", bookingResult);

//       // Extract bookingId correctly (inside 'data' or directly)
//       const bookingId =
//         bookingResult.bookingId ||
//         (bookingResult.data && bookingResult.data.bookingId);

//       if (!bookingId) {
//         throw new Error("Booking ID not received!");
//       }

//       console.log("✅ Booking ID:", bookingId);

//       // Step 2: Prepare Payment Data with bookingId
//       const paymentData = {
//         amount: parseFloat(amount),
//         paymentMethod,
//         bookingId: bookingId, // Correctly store bookingId here
//         paymentDate: new Date().toISOString().split("T")[0], // Today's date
//         status: "SUCCESS", // Default status
//       };
//       if (bookingId) {
//         console.log("Booking ID found:", bookingId);
//       } else {
//         console.error("No Booking ID found!");
//       }
//       // ✅ Store payment data in sessionStorage with bookingId
//       sessionStorage.setItem("paymentData", JSON.stringify(paymentData));

//       console.log("✅ Payment Data Stored in Session:", paymentData);

//       // Step 3: Process Payment
//       const paymentResponse = await fetch(
//         "http://localhost:8080/payment/process",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(paymentData),
//         }
//       );

//       if (!paymentResponse.ok) {
//         throw new Error("Payment failed.");
//       }

//       const paymentResult = await paymentResponse.json();
//       console.log("✅ Payment Successful:", paymentResult);

//       alert("✅ Payment Successful!");
//       navigate("/success");
//     } catch (error) {
//       console.error("❌ Error during booking/payment:", error);
//       setFormError("❌ Error: " + error.message);
//     } finally {
//       setLoading(false);
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
//           <label className="block text-sm font-medium">Flight ID:</label>
//           <input
//             type="text"
//             value={flightId}
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
//           disabled={loading}
//         >
//           {loading ? "Processing..." : "Pay Now"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const PaymentForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Extract query params from URL
//   const queryParams = new URLSearchParams(location.search);
//   const email = queryParams.get("email");
//   const amount = queryParams.get("amount");
//   const seatId = queryParams.get("seatId");

//   // Retrieve flightId from sessionStorage correctly
//   const [flightId, setFlightId] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("CREDITCARD");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [formError, setFormError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const passengerId = sessionStorage.getItem("passengerId");

//   useEffect(() => {
//     const storedFlight = JSON.parse(sessionStorage.getItem("selectedFlight"));
//     if (storedFlight && storedFlight.flightId) {
//       setFlightId(storedFlight.flightId);
//     } else {
//       console.error("⚠ Flight ID not found in session storage!");
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError("");
//     setLoading(true);

//     if (!cardNumber || !expiryDate || !cvv) {
//       setFormError("Please fill in all required fields.");
//       setLoading(false);
//       return;
//     }

//     try {
//       // Step 1: Book the Flight and Seat
//       const bookingData = {
//         passengerId: passengerId,
//         flightId: flightId,
//         seatId: seatId,
//         bookingDate: new Date().toISOString().split("T")[0], // Today's date
//         status: "CONFIRMED",
//       };

//       const bookingResponse = await fetch(
//         "http://localhost:8080/booking/bookSeat",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(bookingData),
//         }
//       );

//       if (!bookingResponse.ok) {
//         throw new Error("Booking failed.");
//       }

//       const bookingResult = await bookingResponse.json();
//       console.log("✅ Booking Result:", bookingResult);

//       // Extract bookingId correctly
//       const bookingId =
//         bookingResult.bookingId ||
//         (bookingResult.data && bookingResult.data.bookingId);

//       if (!bookingId) {
//         throw new Error("Booking ID not received!");
//       }

//       // ✅ Correctly store bookingId after extraction
//       sessionStorage.setItem("bookingId", bookingId);
//       console.log("✅ Booking ID Stored:", bookingId);

//       // Step 2: Prepare Payment Data with bookingId
//       const paymentData = {
//         amount: parseFloat(amount),
//         paymentMethod,
//         bookingId: bookingId, // Correct bookingId usage
//         paymentDate: new Date().toISOString().split("T")[0], // Today's date
//         status: "SUCCESS",
//       };

//       // ✅ Store payment data in sessionStorage with bookingId
//       sessionStorage.setItem("paymentData", JSON.stringify(paymentData));
//       console.log("✅ Payment Data Stored in Session:", paymentData);

//       // Step 3: Process Payment
//       const paymentResponse = await fetch(
//         "http://localhost:8080/payment/process",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(paymentData),
//         }
//       );

//       if (!paymentResponse.ok) {
//         throw new Error("Payment failed.");
//       }

//       const paymentResult = await paymentResponse.json();
//       console.log("✅ Payment Successful:", paymentResult);

//       alert("✅ Payment Successful!");
//       navigate("/success");
//     } catch (error) {
//       console.error("❌ Error during booking/payment:", error);
//       setFormError("❌ Error: " + error.message);
//     } finally {
//       setLoading(false);
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
//           <label className="block text-sm font-medium">Flight ID:</label>
//           <input
//             type="text"
//             value={flightId}
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
//           disabled={loading}
//         >
//           {loading ? "Processing..." : "Pay Now"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const PaymentForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Extract query params from URL
//   const queryParams = new URLSearchParams(location.search);
//   const email = queryParams.get("email");
//   const amount = queryParams.get("amount");
//   const seatId = queryParams.get("seatId");

//   // Retrieve flightId from sessionStorage correctly
//   const [flightId, setFlightId] = useState("");
//   const [bookingId, setBookingId] = useState(null);

//   useEffect(() => {
//     const storedFlight = JSON.parse(
//       sessionStorage.getItem("selectedFlight") || "{}"
//     );
//     if (storedFlight && storedFlight.flightId) {
//       setFlightId(storedFlight.flightId);
//     } else {
//       console.error("⚠ Flight ID not found in session storage!");
//     }
//   }, []);

//   const [paymentMethod, setPaymentMethod] = useState("CREDITCARD");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [formError, setFormError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const passengerId = sessionStorage.getItem("passengerId");

//   // Card validation functions
//   const validateCardNumber = (number) => {
//     // Remove non-digit characters
//     const cleanedNumber = number.replace(/\D/g, "");

//     // Basic validation: length between 12-19 digits
//     if (cleanedNumber.length < 12 || cleanedNumber.length > 19) {
//       return false;
//     }

//     // Luhn algorithm for card number validation
//     let sum = 0;
//     let isEvenIndex = false;

//     for (let i = cleanedNumber.length - 1; i >= 0; i--) {
//       let digit = parseInt(cleanedNumber.charAt(i), 10);

//       if (isEvenIndex) {
//         digit *= 2;
//         if (digit > 9) {
//           digit -= 9;
//         }
//       }

//       sum += digit;
//       isEvenIndex = !isEvenIndex;
//     }

//     return sum % 10 === 0;
//   };

//   const validateExpiryDate = (date) => {
//     const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
//     if (!regex.test(date)) return false;

//     const [month, year] = date.split("/");
//     const currentYear = new Date().getFullYear() % 100;
//     const currentMonth = new Date().getMonth() + 1;

//     const expYear = parseInt(year, 10);
//     const expMonth = parseInt(month, 10);

//     return (
//       expYear > currentYear ||
//       (expYear === currentYear && expMonth >= currentMonth)
//     );
//   };

//   const validateCVV = (cvv) => {
//     return /^\d{3,4}$/.test(cvv);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError("");
//     setLoading(true);

//     // Comprehensive validation
//     if (!cardNumber || !expiryDate || !cvv) {
//       setFormError("Please fill in all required fields.");
//       setLoading(false);
//       return;
//     }

//     // Additional validation checks
//     if (!validateCardNumber(cardNumber)) {
//       setFormError("Invalid card number.");
//       setLoading(false);
//       return;
//     }

//     if (!validateExpiryDate(expiryDate)) {
//       setFormError("Invalid expiry date.");
//       setLoading(false);
//       return;
//     }

//     if (!validateCVV(cvv)) {
//       setFormError("Invalid CVV.");
//       setLoading(false);
//       return;
//     }

//     try {
//       // Step 1: Book the Flight and Seat
//       const bookingData = {
//         passengerId: passengerId,
//         flightId: flightId,
//         seatId: seatId,
//         bookingDate: new Date().toISOString().split("T")[0],
//         status: "CONFIRMED",
//       };

//       const bookingResponse = await fetch(
//         "http://localhost:8080/booking/bookSeat",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(bookingData),
//         }
//       );

//       if (!bookingResponse.ok) {
//         throw new Error("Booking failed.");
//       }

//       const bookingResult = await bookingResponse.json();
//       console.log("✅ Booking Result:", bookingResult);

//       // Extract bookingId correctly
//       const extractedBookingId =
//         bookingResult.bookingId ||
//         (bookingResult.data && bookingResult.data.bookingId);

//       if (!extractedBookingId) {
//         throw new Error("Booking ID not received!");
//       }

//       setBookingId(extractedBookingId);
//       sessionStorage.setItem("bookingId", extractedBookingId);

//       // Step 2: Prepare Payment Data
//       const paymentData = {
//         amount: parseFloat(amount),
//         paymentMethod,
//         bookingId: extractedBookingId,
//         flightId: flightId,
//         seatId: seatId,
//         paymentDate: new Date().toISOString().split("T")[0],
//         status: "SUCCESS",
//       };

//       // Store payment data in sessionStorage
//       sessionStorage.setItem("paymentData", JSON.stringify(paymentData));

//       // Step 3: Process Payment
//       const paymentResponse = await fetch(
//         "http://localhost:8080/payment/process",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(paymentData),
//         }
//       );

//       if (!paymentResponse.ok) {
//         throw new Error("Payment failed.");
//       }

//       const paymentResult = await paymentResponse.json();
//       console.log("✅ Payment Successful:", paymentResult);

//       alert("✅ Payment Successful!");
//       navigate("/success");
//     } catch (error) {
//       console.error("❌ Error during booking/payment:", error);
//       setFormError("❌ Error: " + error.message);
//     } finally {
//       setLoading(false);
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
//             value={email || ""}
//             readOnly
//             className="w-full p-2 border rounded bg-gray-100"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium">Amount:</label>
//           <input
//             type="text"
//             value={amount || ""}
//             readOnly
//             className="w-full p-2 border rounded bg-gray-100"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium">Flight ID:</label>
//           <input
//             type="text"
//             value={flightId || ""}
//             readOnly
//             className="w-full p-2 border rounded bg-gray-100"
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
//             placeholder="1234 5678 9012 3456"
//             required
//             maxLength="19"
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
//             placeholder="12/25"
//             required
//             maxLength="5"
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium">CVV:</label>
//           <input
//             type="text"
//             value={cvv}
//             onChange={(e) => setCvv(e.target.value)}
//             placeholder="123"
//             required
//             maxLength="4"
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {formError && <div className="text-red-500 mb-4">{formError}</div>}

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
//           disabled={loading}
//         >
//           {loading ? "Processing..." : "Pay Now"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const PaymentForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Extract query params from URL
//   const queryParams = new URLSearchParams(location.search);
//   const email = queryParams.get("email");
//   const amount = queryParams.get("amount");
//   const seatId = queryParams.get("seatId");

//   // Retrieve flightId from sessionStorage correctly
//   const [flightId, setFlightId] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("CREDITCARD");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [formError, setFormError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const passengerId = sessionStorage.getItem("passengerId");

//   useEffect(() => {
//     const storedFlight = JSON.parse(sessionStorage.getItem("selectedFlight"));
//     if (storedFlight && storedFlight.flightId) {
//       setFlightId(storedFlight.flightId);
//     } else {
//       console.error("⚠ Flight ID not found in session storage!");
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError("");
//     setLoading(true);

//     if (!cardNumber || !expiryDate || !cvv) {
//       setFormError("Please fill in all required fields.");
//       setLoading(false);
//       return;
//     }

//     try {
//       // Step 1: Book the Flight and Seat
//       const bookingData = {
//         passengerId: passengerId,
//         flightId: flightId,
//         seatId: seatId,
//         bookingDate: new Date().toISOString().split("T")[0], // Today's date
//         status: "CONFIRMED",
//       };

//       const bookingResponse = await fetch(
//         "http://localhost:8080/booking/bookSeat",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(bookingData),
//         }
//       );

//       if (!bookingResponse.ok) {
//         throw new Error("Booking failed.");
//       }

//       const bookingResult = await bookingResponse.json();
//       console.log("✅ Booking Result:", bookingResult);

//       // Extract bookingId correctly
//       const bookingId =
//         bookingResult.bookingId ||
//         (bookingResult.data && bookingResult.data.bookingId);

//       if (!bookingId) {
//         throw new Error("Booking ID not received!");
//       }

//       // ✅ Correctly store bookingId after extraction
//       sessionStorage.setItem("bookingId", bookingId);
//       console.log("✅ Booking ID Stored:", bookingId);

//       // Step 2: Prepare Payment Data with bookingId
//       const paymentData = {
//         amount: parseFloat(amount),
//         paymentMethod,
//         bookingId: bookingId, // Correct bookingId usage
//         paymentDate: new Date().toISOString().split("T")[0], // Today's date
//         status: "SUCCESS",
//       };

//       // ✅ Store payment data in sessionStorage with bookingId
//       sessionStorage.setItem("paymentData", JSON.stringify(paymentData));
//       console.log("✅ Payment Data Stored in Session:", paymentData);

//       // Step 3: Process Payment
//       const paymentResponse = await fetch(
//         "http://localhost:8080/payment/process",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(paymentData),
//         }
//       );

//       if (!paymentResponse.ok) {
//         throw new Error("Payment failed.");
//       }

//       const paymentResult = await paymentResponse.json();
//       console.log("✅ Payment Successful:", paymentResult);

//       alert("✅ Payment Successful!");
//       navigate("/success");
//     } catch (error) {
//       console.error("❌ Error during booking/payment:", error);
//       setFormError("❌ Error: " + error.message);
//     } finally {
//       setLoading(false);
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
//           <label className="block text-sm font-medium">Flight ID:</label>
//           <input
//             type="text"
//             value={flightId}
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
//           disabled={loading}
//         >
//           {loading ? "Processing..." : "Pay Now"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const PaymentForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Extract query params from URL
//   const queryParams = new URLSearchParams(location.search);
//   const email = queryParams.get("email");
//   const amount = queryParams.get("amount");
//   const seatId = queryParams.get("seatId");

//   // Retrieve flightId and passengerId from sessionStorage
//   const [flightId, setFlightId] = useState("");
//   const passengerId = sessionStorage.getItem("passengerId");
//   useEffect(() => {
//     const storedFlight = JSON.parse(sessionStorage.getItem("selectedFlight"));
//     if (storedFlight && storedFlight.flightId) {
//       setFlightId(storedFlight.flightId);
//     } else {
//       console.error("⚠ Flight ID not found in session storage!");
//     }
//   }, []);

//   // Form state
//   const [paymentMethod, setPaymentMethod] = useState("CREDITCARD");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [formError, setFormError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setFormError("");
//   //   setLoading(true);

//   //   if (!cardNumber || !expiryDate || !cvv) {
//   //     setFormError("⚠️ Please fill in all required fields.");
//   //     setLoading(false);
//   //     return;
//   //   }

//   //   try {
//   //     // ✅ Step 1: Book the Seat
//   //     const bookingData = {
//   //       passengerId: passengerId,
//   //       flightId: flightId,
//   //       seatId: seatId,
//   //       bookingDate: new Date().toISOString().split("T")[0],
//   //       status: "CONFIRMED",
//   //     };

//   //     const bookingResponse = await fetch(
//   //       "http://localhost:8080/booking/bookSeat",
//   //       {
//   //         method: "POST",
//   //         headers: { "Content-Type": "application/json" },
//   //         body: JSON.stringify(bookingData),
//   //       }
//   //     );

//   //     if (!bookingResponse.ok) {
//   //       throw new Error("Booking failed.");
//   //     }

//   //     const bookingResult = await bookingResponse.json();
//   //     console.log("✅ Booking Result:", bookingResult);

//   //     // Extract bookingId correctly
//   //     const bookingId =
//   //       bookingResult.bookingId ||
//   //       (bookingResult.data && bookingResult.data.bookingId);

//   //     if (!bookingId) {
//   //       throw new Error("❌ Booking ID not received!");
//   //     }

//   //     console.log("✅ Booking ID:", bookingId);
//   //     sessionStorage.setItem("bookingId", bookingId);

//   //     // ✅ Step 2: Prepare Payment Data
//   //     const paymentData = {
//   //       amount: parseFloat(amount),
//   //       paymentMethod,
//   //       bookingId: bookingId, // Correctly pass bookingId here
//   //       paymentDate: new Date().toISOString().split("T")[0],
//   //       status: "SUCCESS",
//   //     };

//   //     // ✅ Store payment data in sessionStorage
//   //     sessionStorage.setItem("paymentData", JSON.stringify(paymentData));
//   //     console.log("✅ Payment Data Stored:", paymentData);

//   //     // ✅ Step 3: Process Payment
//   //     const paymentResponse = await fetch(
//   //       "http://localhost:8080/payment/process",
//   //       {
//   //         method: "POST",
//   //         headers: { "Content-Type": "application/json" },
//   //         body: JSON.stringify(paymentData),
//   //       }
//   //     );

//   //     if (!paymentResponse.ok) {
//   //       throw new Error("Payment failed.");
//   //     }

//   //     const paymentResult = await paymentResponse.json();
//   //     console.log("✅ Payment Successful:", paymentResult);

//   //     alert("✅ Payment Successful!");
//   //     navigate("/success");
//   //   } catch (error) {
//   //     console.error("❌ Error during booking/payment:", error);
//   //     setFormError("❌ Error: " + error.message);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError("");
//     setLoading(true);

//     if (!cardNumber || !expiryDate || !cvv) {
//       setFormError("⚠️ Please fill in all required fields.");
//       setLoading(false);
//       return;
//     }

//     try {
//       // ✅ Step 1: Book the Seat
//       const bookingData = {
//         passengerId: passengerId,
//         flightId: flightId,
//         seatId: seatId,
//         bookingDate: new Date().toISOString().split("T")[0],
//         status: "CONFIRMED",
//       };

//       const bookingResponse = await fetch(
//         "http://localhost:8080/booking/bookSeat",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(bookingData),
//         }
//       );

//       if (!bookingResponse.ok) {
//         throw new Error("❌ Booking failed.");
//       }

//       const bookingResult = await bookingResponse.json();
//       console.log("✅ Booking Result:", bookingResult);

//       // ✅ Extract bookingId correctly
//       let bookingId =
//         bookingResult.bookingId ||
//         (bookingResult.data && bookingResult.data.bookingId);

//       // ✅ If bookingId is missing, try fetching from sessionStorage
//       if (!bookingId) {
//         console.warn("⚠️ Booking ID not received. Checking sessionStorage...");
//         bookingId = sessionStorage.getItem("bookingId");

//         if (!bookingId) {
//           throw new Error(
//             "❌ Booking ID still not found. Cannot proceed with payment."
//           );
//         }
//       } else {
//         // ✅ Store bookingId in sessionStorage if received successfully
//         sessionStorage.setItem("bookingId", bookingId);
//       }

//       console.log("✅ Booking ID:", bookingId);

//       // ✅ Step 2: Prepare Payment Data
//       const paymentData = {
//         amount: parseFloat(amount),
//         paymentMethod,
//         bookingId: bookingId, // Correctly pass bookingId here
//         paymentDate: new Date().toISOString().split("T")[0],
//         status: "SUCCESS",
//       };

//       // ✅ Store payment data in sessionStorage
//       sessionStorage.setItem("paymentData", JSON.stringify(paymentData));
//       console.log("✅ Payment Data Stored:", paymentData);

//       // ✅ Step 3: Process Payment
//       const paymentResponse = await fetch(
//         "http://localhost:8080/payment/process",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(paymentData),
//         }
//       );

//       if (!paymentResponse.ok) {
//         throw new Error("❌ Payment failed.");
//       }

//       const paymentResult = await paymentResponse.json();
//       console.log("✅ Payment Successful:", paymentResult);

//       alert("✅ Payment Successful!");
//       navigate("/success");
//     } catch (error) {
//       console.error("❌ Error during booking/payment:", error);
//       setFormError("❌ Error: " + error.message);
//     } finally {
//       setLoading(false);
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
//           <label className="block text-sm font-medium">Flight ID:</label>
//           <input
//             type="text"
//             value={flightId}
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
//           disabled={loading}
//         >
//           {loading ? "Processing..." : "Pay Now"}
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

  // Retrieve flightId and passengerId from sessionStorage
  const [flightId, setFlightId] = useState("");
  const passengerId = sessionStorage.getItem("passengerId");

  useEffect(() => {
    const storedFlight = JSON.parse(sessionStorage.getItem("selectedFlight"));
    if (storedFlight && storedFlight.flightId) {
      setFlightId(storedFlight.flightId);
    } else {
      console.error("⚠ Flight ID not found in session storage!");
    }
  }, []);

  // Form state
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
      setFormError("⚠️ Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      // ✅ Step 1: Book the Seat
      const bookingData = {
        passengerId: passengerId,
        flightId: flightId,
        seatId: seatId,
        bookingDate: new Date().toISOString().split("T")[0],
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
        throw new Error("❌ Booking failed.");
      }

      const bookingResult = await bookingResponse.json();
      console.log("✅ Booking Result:", bookingResult);

      let bookingId =
        bookingResult.bookingId ||
        (bookingResult.data && bookingResult.data.bookingId);

      if (!bookingId) {
        console.warn("⚠️ Booking ID not received. Checking sessionStorage...");
        bookingId = sessionStorage.getItem("bookingId");

        if (!bookingId) {
          throw new Error(
            "❌ Booking ID still not found. Cannot proceed with payment."
          );
        }
      } else {
        sessionStorage.setItem("bookingId", bookingId);
      }

      console.log("✅ Booking ID:", bookingId);

      // ✅ Step 2: Prepare Payment Data
      const paymentData = {
        amount: parseFloat(amount),
        paymentMethod,
        bookingId: bookingId,
        paymentDate: new Date().toISOString().split("T")[0],
        status: "SUCCESS",
      };

      sessionStorage.setItem("paymentData", JSON.stringify(paymentData));
      console.log("✅ Payment Data Stored:", paymentData);

      // ✅ Step 3: Process Payment
      const paymentResponse = await fetch(
        "http://localhost:8080/payment/process",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentData),
        }
      );

      if (!paymentResponse.ok) {
        throw new Error("❌ Payment failed.");
      }

      const paymentResult = await paymentResponse.json();
      console.log("✅ Payment Successful:", paymentResult);

      alert("✅ Payment Successful!");
      navigate("/success");
    } catch (error) {
      console.error("❌ Error during booking/payment:", error);
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
