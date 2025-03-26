import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/reducers/authreducer";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignup = (event) => {
    event.preventDefault();
    if (password && /\s/.test(password) || confirmPassword &&/\s/.test(confirmPassword)) {
      toast.error("Password cannot contain spaces.");
      return;
    }

    if (!email?.trim() || !password?.trim() || !confirmPassword?.trim() || !name?.trim()) {
      toast.error("Fields cannot be empty.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (/\s/.test(password)) {
      toast.error("Password cannot contain spaces.");
      return;
    }

    if (password?.trim() !== confirmPassword?.trim()) {
      toast.error("Passwords do not match.");
      return;
    }

    let body = { email, password, name };
    dispatch(signupUser(body)).then((res) => {
      toast.success("Signup Successfully");
      navigate("/addTodo");
    });
  };

  return (
    <>
      <form onSubmit={handleSignup} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-center text-2xl font-semibold mb-4">Sign Up</h3>

        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={6}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block font-medium mb-1">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign up
        </button>
      </form>
    </>
  );
}

export default Signup;
