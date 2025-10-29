import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaTicketAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer mt-5 py-5 text-white">
      <Container>
        <Row className="gy-4">
          {/* Logo + Tagline */}
          <Col md={4}>
            <div className="d-flex align-items-center mb-2">
              <FaTicketAlt size={28} className="text-primary me-2" />
              <h4 className="fw-bold mb-0">Tickets<span className="text-primary">Now</span></h4>
            </div>
            <p className="text-light small">
              Discover events, book tickets, and make memories — all in one place.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4}>
            <h5 className="fw-semibold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/events" className="footer-link">Events</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </Col>

          {/* Follow Us */}
          <Col md={4}>
            <h5 className="fw-semibold mb-3">Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="social-icon"><FaFacebookF /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaLinkedinIn /></a>
            </div>
          </Col>
        </Row>

        <hr className="my-4 border-light opacity-25" />

        {/* Bottom text */}
        <Row>
          <Col className="text-center">
            <p className="mb-0 small">
              © {new Date().getFullYear()} <strong>TicketsNow</strong>. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Inline CSS */}
      <style>{`
        .footer {
          background: linear-gradient(180deg, #111 0%, #000 100%);
        }
        .footer-link {
          color: #bbb;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer-link:hover {
          color: #007bff;
        }
        .social-icon {
          color: #bbb;
          font-size: 1.25rem;
          transition: transform 0.3s ease, color 0.3s ease;
        }
        .social-icon:hover {
          color: #007bff;
          transform: translateY(-3px);
        }
      `}</style>
      <button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="btn btn-primary rounded-circle shadow position-fixed"
  style={{
    bottom: "30px",
    right: "30px",
    zIndex: 999,
  }}
>
  ↑
</button>
    </footer>
  );
};

export default Footer;
