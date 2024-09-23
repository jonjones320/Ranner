import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RannerApi from '../../api';

function Destination() {
  const { state } = useLocation();
  const { origin } = state || {}; // Destructure origin from state
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    setDestination(e.target.value);
    if (e.target.value.length >= 3) {
      const res = await RannerApi.getAirportSuggestions(e.target.value);
      setSuggestions(res);
    }
  };

  const handleSuggestionClick = (iataCode) => {
    setDestination(iataCode);
    setSuggestions([]);
  };

  const handleNext = () => {
    navigate("/dates", { state: { origin, destination } });
  };

  return (
    <div>
      <h2>Choose Your Destination</h2>
      <input
        type="text"
        placeholder="Enter city or airport"
        value={destination}
        onChange={handleChange}
      />
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion.iataCode)}>
            {suggestion.name} ({suggestion.iataCode})
          </li>
        ))}
      </ul>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default Destination;
