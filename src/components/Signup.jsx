import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { ErrorHandler, useErrorHandler  } from '../utils/errorHandler';
import ErrorAlert from './ErrorAlert';
import RannerApi from '../../api';


function SignUp() {

  // Initial form values.
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const { error, handleError, clearError } = useErrorHandler();
  const navigate = useNavigate();

  // Responds to form input so inputs are maintained in the state. 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  // Passes signup form data to the backend and handles errors.
  const handleSubmit = async (e) => {
    e.preventDefault();    
    setIsLoading(true);
    
    try {
      await RannerApi.signUp(formData);
      await login(formData);
      navigate("/origin");
    } catch (err) {
      handleError(ErrorHandler.handleApiError(err));
    } finally {
      setIsLoading(false);
    }
};


  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="text-center mb-4">Sign Up</h1>
          
          {error && (
          <ErrorAlert 
          error={error} 
          onDismiss={clearError}
          />
          )}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="firstName">First Name</Form.Label>
              <Form.Control
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="lastName">Last Name</Form.Label>
              <Form.Control
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </Form.Group>
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Signing up...
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;