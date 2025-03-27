import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();
  const onSignup = async () => {
    if (firstName.length === 0) {
      toast.warn("Please enter first name");
    } else if (lastName.length === 0) {
      toast.warn("Please enter last name");
    } else if (email.length === 0) {
      toast.warn("Please enter email");
    } else if (phone.length === 0) {
      toast.warn("Please enter phone number");
    } else if (password.length === 0) {
      toast.warn("Please enter password");
    } else if (confirmPassword.length === 0) {
      toast.warn("Please confirm password");
    } else if (password !== confirmPassword) {
      toast.warn("Password does not match");
    } else {
      // API request
      const user = {
        firstName,
        lastName,
        email,
        password,
        dob,
        phone,
        country,
      };

      try {
        const response = await fetch("http://localhost:8080/users/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const result = await response.json();

        if (response.ok) {
          toast.success("Successfully registered a new admin");
          navigate("/login");
        } else {
          toast.error(result.message || "Registration failed");
        }
      } catch (error) {
        toast.error("Server error: Unable to register");
      }
    }
  };

  return (
    <div
      className="card shadow-lg p-4 rounded"
      style={{
        width: "60%",
        marginTop: "50px",
        marginLeft: "20%",
        marginRight: "20%",
      }}
    >
      <h2 className="header text-center">🛫 Airline Reservation Register</h2>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-4">
                <input
                  id="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="First Name"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <input
                  id="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Last Name"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-4">
                <input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <input
                  id="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="Phone Number"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-4">
                <input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <input
                  id="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Confirm Password"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-4">
                <input
                  id="dob"
                  onChange={(e) => setDob(e.target.value)}
                  type="date"
                  placeholder="Date of Birth"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <input
                  id="country"
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                  placeholder="Country"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="mb-4">
              Already have an account? <Link to="/login">Signin here</Link>
            </div>
            <button onClick={onSignup} className="mt-3 btn btn-success">
              Signup
            </button>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
}
export default Register;
