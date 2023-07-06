import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import nock from 'nock';
import AddJobs from './AddJobs';

describe('AddJobs', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('submits the form and makes an API request', async () => {
        // Mock the API request using nock
        const scope = nock('http://localhost:5000')
            .post('/api/jobs')
            .reply(200, { success: true });

        // Render the component
        render(<AddJobs show={true} handleClose={() => {}} />);

        // Fill in the form fields
        fireEvent.change(screen.getByPlaceholderText('Enter Title'), { target: { value: 'Job Title' } });
        fireEvent.change(screen.getByPlaceholderText('Enter Company'), { target: { value: 'Company Name' } });
        fireEvent.change(screen.getByPlaceholderText('Enter Location'), { target: { value: 'Location' } });
        fireEvent.change(screen.getByPlaceholderText('Enter Description'), { target: { value: 'Description' } });
        fireEvent.change(screen.getByPlaceholderText('Enter Requirements'), { target: { value: 'Requirements' } });

        // Submit the form
        fireEvent.click(screen.getByText('Save Changes'));
        console.log('Intercepted requests:', scope.activeMocks());
        // Wait for the API request to complete
        await waitFor(() => expect(scope.isDone()).toBe(true));

    });
});
