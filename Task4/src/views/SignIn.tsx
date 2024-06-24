import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, selectUser } from "../state/userSlice";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(signIn({ email, password }));
    if (user.status === "idle") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-4xl font-bold text-center">Sign In</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
