import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import RannerApi from '../../api';
import TripCard from './TripCard';

function Profile() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await RannerApi.patchUser(currentUser.username, formData);
      setCurrentUser(updatedUser);
    } catch (err) {
      setError('There was an error updating your profile. Please try again.');
    }
  };

  return (
    <div>
      <h1>{currentUser.username}</h1>
      <h3>Edit profile</h3>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='firstName'>First Name:</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='lastName'>Last Name:</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Save Changes</button>
      </form>
      <div>
        <h2 className='Profile-trips-title'>Trips</h2>
        <ul className='Profile-trips-list'>
          {(currentUser.trips || []).map(trip => (
            <TripCard
              key={trip.id}
              id={trip.id}
              name={trip.name || "Name unavailable"}
              destination={trip.destination || "Destination unavailable"}
              startDate={trip.startDate}
              endDate={trip.endDate}
            />
          ))}
        </ul>
      </div>
    </div>
    )
  }

export default Profile;