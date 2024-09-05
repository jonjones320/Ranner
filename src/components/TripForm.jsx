import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import RannerApi from '../../api';
import AuthContext from '../context/AuthContext';

function TripForm({ initialData = {}, tripId }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    ...initialData
  });

  useEffect(() => {
    if (tripId) {
      async function fetchTrip() {
        const trip = await RannerApi.getTrip(tripId);
        setFormData({
          name: trip.name,
          username: currentUser.username,
          destination: trip.destination,
          startDate: trip.startDate,
          endDate: trip.endDate,
          budget: trip.budget
        });
      }
      fetchTrip();
    }
  }, [tripId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = { ...formData, username: currentUser.username };
      if (tripId) {
        await RannerApi.updateTrip(tripId, dataToSubmit);
        navigate(`/trips/${tripId}`);
      } else {
        const newTripId = await RannerApi.postTrip(formData);
        navigate(`/trips/${newTripId}`);
      }
    } catch (err) {
      setError(err || 'Something went wrong');
    }
  };

  return (
    <div>
      <h1>{tripId ? 'Edit Trip' : 'New Trip'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="budget">Budget:</label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{tripId ? 'Update Trip' : 'Create Trip'}</button>
      </form>
    </div>
  );
}

export default TripForm;