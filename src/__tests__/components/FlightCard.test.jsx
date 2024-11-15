import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithContext } from '../utils/testUtils';
import { mockUser, mockFlight } from '../helpers/testData';
import FlightCard from '../../components/FlightCard';
import RannerApi from '../../../api';

describe('FlightCard', () => {
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders flight details correctly', () => {
    renderWithContext(
      <FlightCard 
        flight={mockFlight} 
        onRemove={mockOnRemove} 
        username={mockUser.username} 
      />
    );

    // Check basic flight information using text content instead of roles.
    expect(screen.getByText('SFO ↔ JFK')).toBeInTheDocument();
    expect(screen.getByText('500.00 USD')).toBeInTheDocument();
    expect(screen.getByText(/duration:/i)).toBeInTheDocument();
    expect(screen.getByText(/stops:/i)).toBeInTheDocument();
  });

  test('handles flight removal', async () => {
    RannerApi.deleteFlight.mockResolvedValueOnce();
    
    renderWithContext(
      <FlightCard 
        flight={{ ...mockFlight, tripId: 1 }}
        onRemove={mockOnRemove}
        username={mockUser.username}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /remove flight/i }));

    await waitFor(() => {
      expect(RannerApi.deleteFlight).toHaveBeenCalledWith(
        mockFlight.id,
        mockUser.username
      );
      expect(mockOnRemove).toHaveBeenCalledWith(mockFlight.id);
    });
  });

  test('handles flight removal error', async () => {
    RannerApi.deleteFlight.mockRejectedValueOnce(new Error('Failed to remove flight'));
    
    renderWithContext(
      <FlightCard 
        flight={{ ...mockFlight, tripId: 1 }}
        onRemove={mockOnRemove}
        username={mockUser.username}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /remove flight/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Failed to remove flight/i);
      expect(mockOnRemove).not.toHaveBeenCalled();
    });
  });
});