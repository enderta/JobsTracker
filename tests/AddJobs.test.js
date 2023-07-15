import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import AddJobs from '../src/components/jobtracker/AddJobs';

describe('AddJobs', () => {
    afterEach(() => {
        fetchMock.restore(); // Restore fetch to its original implementation after each test
    });

    it('submits the form and makes an API request', async () => {
        // Mock the API request using nock
     fetchMock.post('http://localhost:5000/api/jobs', {
            status: 200,
            body: { success: true },
        });

        render(<AddJobs show={true} />);
        // Submit the form
        fireEvent.change(screen.getByPlaceholderText('Enter Title'), { target: { value: 'Job Title' } });
        fireEvent.change(screen.getByPlaceholderText('Enter Company'), { target: { value: 'Company Name' } });
        fireEvent.change(screen.getByPlaceholderText('Enter Location'), { target: { value: 'Location' } });
        fireEvent.change(screen.getByPlaceholderText('Enter Description'), { target: { value: 'Description' } });
        fireEvent.change(screen.getByPlaceholderText('Enter Requirements'), { target: { value: 'Requirements' } });


        fireEvent.click(screen.getByTestId('submit-button'));

       //compare the result
        await waitFor(() => expect(fetchMock.called('http://localhost:5000/api/jobs', 'POST')).toBe(true));
    });
});
