import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authActions";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import AlertBox from "../components/AlertBox";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "admin") navigate("/dashboard/admin");
      else if (userInfo.role === "host") navigate("/dashboard/host");
      else navigate("/dashboard/user");
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div
      className="login-page d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1350&q=80')",
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
          width: "400px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: "#fff",
        }}
      >
        <h2 className="text-center mb-4 fw-bold">Welcome Back 🎟️</h2>
        <p className="text-center mb-4" style={{ color: "#e0e0e0" }}>
          Log in to book your next unforgettable event
        </p>

        {loading && <Loader />}
        {error && <AlertBox type="danger" message={error} />}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-light">
              Email
            </label>
            <input
              type="email"
              className="form-control form-control-lg bg-transparent text-light border-light"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="form-label text-light">
              Password
            </label>
            <input
              type="password"
              className="form-control form-control-lg bg-transparent text-light border-light"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="text-end mt-1">
            <Link
              to="/forgot-password"
              className="text-light small"
              style={{ textDecoration: "underline" }}
            >
              Forgot Password?
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn btn-light w-100 mt-3 py-2 fw-bold"
            style={{
              borderRadius: "10px",
              transition: "all 0.3s ease-in-out",
            }}
          >
            Login
          </motion.button>
        </form>

        {/* 🔥 Social Login Section */}
        <div className="text-center mt-4">
          <p className="text-light mb-2">Or login with</p>
          <div className="d-flex justify-content-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="btn btn-outline-light rounded-circle"
              style={{ width: "45px", height: "45px" }}
            >
              <i className="fab fa-google"></i>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="btn btn-outline-light rounded-circle"
              style={{ width: "45px", height: "45px" }}
            >
              <i className="fab fa-facebook-f"></i>
            </motion.button>
          </div>
        </div>

        <p className="mt-4 text-center text-light">
          Don’t have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#ffd700", textDecoration: "none" }}
          >
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
