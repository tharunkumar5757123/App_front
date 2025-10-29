import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/authActions";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import AlertBox from "../components/AlertBox";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(username, email, password, role, navigate));
  };

  return (
    <div
      className="register-page d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-card p-5 shadow-lg"
        style={{
          width: "420px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: "#fff",
        }}
      >
        <h2 className="text-center mb-3 fw-bold">Create Your Account 🎉</h2>
        <p className="text-center mb-4" style={{ color: "#e0e0e0" }}>
          Join us to book, host, and enjoy amazing events!
        </p>

        {loading && <Loader />}
        {error && <AlertBox type="danger" message={error} />}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-light">
              Username
            </label>
            <input
              type="text"
              className="form-control bg-transparent text-light border-light"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-light">
              Email
            </label>
            <input
              type="email"
              className="form-control bg-transparent text-light border-light"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-light">
              Password
            </label>
            <input
              type="password"
              className="form-control bg-transparent text-light border-light"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label text-light">
              Role
            </label>
            <select
              id="role"
              className="form-select bg-transparent text-light border-light"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                borderRadius: "10px",
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
            >
              <option value="user">User</option>
              <option value="host">Host</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn btn-light w-100 mt-3 py-2 fw-bold"
            style={{
              borderRadius: "10px",
              background: "linear-gradient(90deg, #ffd700, #ff9800)",
              color: "#000",
              fontWeight: 600,
            }}
          >
            Register
          </motion.button>
        </form>

        <p className="mt-4 text-center text-light">
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#ffd700", textDecoration: "none" }}
          >
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
