import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="home-page fade-in">
      <Container>
        <Row className="align-items-center" style={{ minHeight: '80vh', marginLeft: '1vw' }}>
          <Col md={6}>
            <h1 className="display-4 mb-4">Explore the World with Ranner</h1>
            <p className="lead mb-4">
              Plan your next adventure with ease. Discover new destinations, 
              find the best flights, and create unforgettable memories.
            </p>
            <Row>
              <Col className="homepage-buttons">
                {currentUser ? (
                  <Link to="/origin">
                    <Button variant="primary" size="lg" className="mr-3">Start Your Journey</Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button variant="primary" size="lg" className="mr-3">Log In</Button>
                  </Link>
                )}
              </Col>
              <Col className="homepage-buttons">
                {!currentUser && (
                  <Link to="/signup">
                    <Button variant="outline-primary" size="lg">Sign Up</Button>
                  </Link>
                )}
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <div className="hero-image">
              <img 
                src="/images/tom-barrett-cloudy-wing-tip.jpg" 
                alt="Airplane wing tip in clouds" 
                className="img-fluid" 
              />
            </div>
          </Col>
        </Row>
      </Container>
      <div className="features-section">
        <Container>
          <h2 className="text-center mb-5">Why Choose Ranner?</h2>
          <Row>
            <Col md={4}>
              <div className="feature-item text-center">
                <i className="fas fa-globe fa-3x mb-3"></i>
                <h3>Explore Anywhere</h3>
                <p>Find flights to any destination around the world.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-item text-center">
                <i className="fas fa-dollar-sign fa-3x mb-3"></i>
                <h3>Best Prices</h3>
                <p>Get the most competitive prices for your trips.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-item text-center">
                <i className="fas fa-user-shield fa-3x mb-3"></i>
                <h3>Secure Booking</h3>
                <p>Book with confidence using our secure platform.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;