import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./EntrancePage.css"; // Scoped CSS

const EntrancePage = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    navigate(`/login?role=${role}`);
  };

  return (
    <div className="entrance-page">
      <header className="nav-bar">
        <h1>AOI</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>
      <Container className="text-center main-content">
        <h1 className="main-title">Adaptive Organizational Intelligence</h1>
        <p className="subtitle">
          Empowering individuals and organizations with innovative solutions.
        </p>
        <Row className="role-buttons">
          <Col>
            <button
              className="role-button hr-button"
              onClick={() => handleRoleSelection("HR")}
            >
              HR
            </button>
          </Col>
          <Col>
            <button
              className="role-button manager-button"
              onClick={() => handleRoleSelection("Manager")}
            >
              Manager
            </button>
          </Col>
          <Col>
            <button
              className="role-button employee-button"
              onClick={() => handleRoleSelection("Employee")}
            >
              Employee
            </button>
          </Col>
        </Row>
      </Container>
      <footer className="footer">
        <p>© 2024 AOI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EntrancePage;
