import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login } from "../redux/slices/AuthSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirect = new URLSearchParams(search).get("redirect") || "/";

  const { userInfo, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="flex justify-center mt-10">
  <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4 text-center text-black">Sign In</h1>

    {error && <p className="text-red-600 mb-4">{error}</p>}

    <form onSubmit={submitHandler}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
    className="mt-1 p-2 block text-black w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
    className="mt-1 p-2 block text-black w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Sign In
      </button>
    </form>

    <div className="mt-4 text-center">
      <p>
        New Customer?{" "}
        <Link
          to={redirect ? `/register?redirect=${redirect}` : "/register"}
          className="text-blue-600 hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  </div>
</div>

  );
};

export default LoginPage;
