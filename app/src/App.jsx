import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";
import TicketSuccess from "./pages/TicketSuccess";
import ManageUsers from "./pages/ManageUsers";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import EventsPage from "./pages/EventsPage";
import PaymentOptions from "./pages/PaymentOptions";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

// ✅ Lazy load pages for faster first load
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const EventDetails = lazy(() => import("./pages/EventDetail"));
const CreateEvent = lazy(() => import("./pages/CreateEvent"));
const UpdateEvent = lazy(() => import("./pages/UpdateEvent"));
const EditTicket = lazy(() => import("./pages/EditTicket"));
const MyTickets = lazy(() => import("./pages/MyTickets"));
const ScanTicket = lazy(() => import("./pages/ScanTicket"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const UserDashboard = lazy(() => import("./pages/Dashboard/UserDashboard"));
const HostDashboard = lazy(() => import("./pages/Dashboard/HostDashboard"));
const AdminDashboard = lazy(() => import("./pages/Dashboard/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  const location = useLocation();

  // ✅ Hide Navbar and Footer on Login & Register
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  // ✅ Auto scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // ✅ Smooth animation for page transitions
  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  return (
    <div className="app">
      {!hideLayout && <NavBar />}

      <Suspense fallback={<Loader />}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            {...pageTransition}
            className="page-wrapper"
          >
            <Routes location={location} key={location.pathname}>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/events" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/update-event/:id" element={<UpdateEvent />} />
              <Route path="/payment-options" element={<PaymentOptions />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-failed" element={<PaymentFailed />} />
              <Route
                path="/ticket-success/:ticketId"
                element={<TicketSuccess />}
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard/user"
                element={
                  <ProtectedRoute role="user">
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute role="user">
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute role="admin">
                    <ManageUsers />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/edit-ticket/:id"
                element={
                  <ProtectedRoute role="user">
                    <EditTicket />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/my-tickets"
                element={
                  <ProtectedRoute role="user">
                    <MyTickets />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/host"
                element={
                  <ProtectedRoute role="host">
                    <HostDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/create-event"
                element={
                  <ProtectedRoute role="host">
                    <CreateEvent />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/host/scan-ticket"
                element={
                  <ProtectedRoute role="host">
                    <ScanTicket />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/admin"
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin-panel"
                element={
                  <ProtectedRoute role="admin">
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/reports"
                element={
                  <ProtectedRoute role="admin">
                    <div className="p-5">Reported Events (Coming Soon)</div>
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Suspense>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
