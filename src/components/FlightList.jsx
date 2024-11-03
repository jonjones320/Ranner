import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Spinner, Button, Card, Alert } from 'react-bootstrap';
import RannerApi from '../../api';
import FlightCard from './FlightCard';
import ErrorAlert from './ErrorAlert';

function FlightList() {
  const { state } = useLocation();
  const { trip } = state || {};
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchFlights = async () => {
    if (!trip) {
      setError("Trip information is missing");
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      console.log("1 - FlightList - Trip: ", trip);
      const res = await RannerApi.searchFlightOffers({
        originLocationCode: trip.origin,
        destinationLocationCode: trip.destination,
        departureDate: trip.startDate,
        returnDate: trip.endDate,
        adults: Number(trip.passengers) || 1
      });
    } catch (err) {
      setError(err?.response?.data?.error?.message || 'Failed to load flights');
    } finally {
      setIsLoading(false);
    }
  };

  // fetchFlights is ran if there's a change to `trip`.
  useEffect(() => {
    fetchFlights();
  }, [trip]);

  // Makes POST request to server when a flight is selected to be added.
  const handleAddFlight = async (flight) => {
    try {
      const tripId = trip.tripId;
      await RannerApi.postFlight({ 
        tripId, 
        amadeusOrderId: flight.id,
        flightDetails: flight
      });
      navigate(`/trip/${tripId}`);
    } catch (err) {
      setError(err?.response?.data?.error?.message || "Error adding flight to trip");
    }
  };

  
  /**
   * JSX
   */

  
  // Loading animation with spinner.
  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading flights...</span>
        </Spinner>
      </Container>
    );
  };

  // Reusable header fragment.
  const HeaderSection = () => (
    <>
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        &larr; Back
      </Button>
      <h2 className="mb-4">Flight Offers</h2>
    </>
  );

  // Handle no flights found separately from errors.
  if (!flights || flights.length === 0) {
    return (
      <Container className="mt-5">
        <HeaderSection />
        <Alert variant="info">
          No flights found for your search criteria. Please try different dates or locations.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
    <HeaderSection />
    {error && (
      <ErrorAlert
        error={error}
        onDismiss={() => setError(null)}
        onRetry={fetchFlights}
      />
    )}
      
    {flights.map((flight) => (
      <Card key={flight.id} className="mb-4">
        <Card.Body>
          <FlightCard flight={flight} />
          <Button 
            onClick={() => handleAddFlight(flight)} 
            className="mt-3 w-100"
            variant="primary"
          >
            Add Flight
          </Button>
        </Card.Body>
      </Card>
    ))}
    </Container>
  );
}

export default FlightList;