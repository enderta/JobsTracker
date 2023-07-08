import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import AddJobs from './AddJobs';

describe('AddJobs', () => {
    afterEach(() => {
        fetchMock.restore(); // Restore fetch to its original implementation after each test
    });

    it('submits the form and makes an API request', async () => {
        // Mock the API request using nock
const scope = fetchMock.post('http://localhost:5000/api/jobs', {
            status: 200,
            body: { success: true },
        });

        render(<AddJobs show={true} handleClose={() => {}} />);

        // Fill in the form fields
        fireEvent.change(screen.getByPlaceholderText('Enter Title'), { target: { value: 'Job Title' } });
        fireEvent.change(screen.getByPlaceholderText('Enter Company'), { target: { value: 'Company Name' } });
        fireEvent.change(screen.getByPlaceholderText('Enter Location'), { target: { value: 'Location' } });
        fireEvent.change(screen.getByPlaceholderText('Enter Description'), { target: { value: 'Description' } });
        fireEvent.change(screen.getByPlaceholderText('Enter Requirements'), { target: { value: 'Requirements' } });

        // Submit the form
        fireEvent.click(screen.getByText('Save Changes'));

        // Wait for the API request to complete
        expect(fetchMock.called('http://localhost:5000/api/jobs', 'POST')).toBe(true);

    });
});
