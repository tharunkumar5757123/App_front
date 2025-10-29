import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { FaTicketAlt, FaSearch } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?category=${category}&q=${searchQuery}`);
    }
  };

  return (
    <>
      {/* ===== Navbar ===== */}
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm"
        style={{
          backgroundColor: "#0d0d0d",
          padding: "0.8rem 0",
          zIndex: 1050, // ✅ ensures it stays above modals and content
        }}
      >
        <div className="container-fluid px-4">
          {/* Logo */}
          <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
            <FaTicketAlt className="me-2 text-warning" size={22} />
            <span>Eventify</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar content */}
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Center Search */}
            <form
              className="d-flex mx-auto align-items-center"
              style={{ maxWidth: "600px", width: "100%" }}
              onSubmit={handleSearch}
            >
              <select
                className="form-select bg-dark text-light border-secondary"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: "130px",
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                <option>All</option>
                <option>Music</option>
                <option>Sports</option>
                <option>Comedy</option>
                <option>Theatre</option>
                <option>Workshops</option>
              </select>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                placeholder="Search for events, artists, venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  borderLeft: "none",
                  borderRight: "none",
                }}
              />
              <button
                className="btn btn-warning d-flex align-items-center justify-content-center"
                type="submit"
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              >
                <FaSearch />
              </button>
            </form>

            {/* Right Side Buttons */}
            <div className="d-flex align-items-center gap-2 ms-auto mt-2 mt-lg-0">
              {!userInfo ? (
                <>
                  <Link
                    to="/login"
                    className="btn btn-outline-light btn-sm px-3 fw-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-warning btn-sm px-3 fw-semibold"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <span className="text-light me-2">
                    Hi, {userInfo.username || "User"}
                  </span>
                  <button
                    className="btn btn-outline-danger btn-sm fw-semibold"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Spacer to prevent content overlap ===== */}
      <div style={{ height: "72px" }}></div>
    </>
  );
};

export default Navbar;
