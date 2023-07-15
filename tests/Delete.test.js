import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import Delete from '../src/components/jobtracker/Delete';

describe('Delete component', () => {
    afterEach(() => {
        fetchMock.restore(); // Restore fetch to its original implementation after each test
    });

    it('should make a DELETE request when the delete button is clicked', async () => {
        // Mock the DELETE request using fetchMock
        fetchMock.delete('http://localhost:5000/api/jobs/1', { success: true });

        render(<Delete id={1} />);

        // Click the delete button
        fireEvent.click(screen.getByTestId('delete-button'));

        // Wait for the request to complete
        await screen.findByText('Delete'); // Wait for the button text to change (indicating the request is complete)

        // Assert that the DELETE request was made
        expect(fetchMock.called('http://localhost:5000/api/jobs/1', 'DELETE')).toBe(true);
    });

});
