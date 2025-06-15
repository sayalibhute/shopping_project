// import React, { useState, useEffect } from "react";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import { register } from "../redux/slices/authSlice";
// import { Link } from "react-router-dom";

// function RegisterPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { search } = useLocation();
//   const redirect = new URLSearchParams(search).get("redirect") || "/";

//   const { userInfo, error } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [navigate, userInfo, redirect]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(register({ name, email, password }));
//   };

//   return (
//     <Row className="justify-content-md-center">
//       <Col xs={12} md={6}>
//         <h1>Register</h1>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         <Form onSubmit={submitHandler}>
//           <Form.Group controlId="name" className="my-2">
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group controlId="email" className="my-2">
//             <Form.Label>Email Address</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group controlId="password" className="my-2">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Form.Group>
//           <Button type="submit" variant="primary" className="my-2">
//             Register
//           </Button>
//         </Form>

//         <Row className="py-3">
//           <Col>
//             Have an account?{" "}
//             <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
//               Login
//             </Link>
//           </Col>
//         </Row>
//       </Col>
//     </Row>
//   );
// }

// export default RegisterPage;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { register } from "../redux/slices/AuthSlice";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirect = new URLSearchParams(search).get("redirect") || "/";

  const { userInfo, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <div className="flex justify-center mt-10">
  <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
<h1 className="text-2xl font-bold mb-4 text-center text-black">Register</h1>
    {message && <p className="text-red-600">{message}</p>}
    {error && <p className="text-red-600">{error}</p>}
    {loading && <p>Loading...</p>}

    <form onSubmit={submitHandler}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 text-black block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 text-black block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 p-2 block text-black w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 p-2 text-black block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Register
      </button>
    </form>

    <div className="mt-4 text-center">
      <p>
        Have an Account?{" "}
        <Link
          to={redirect ? `/login?redirect=${redirect}` : "/login"}
          className="text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  </div>
</div>

  );
};

export default RegisterPage;
