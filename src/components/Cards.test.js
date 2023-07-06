import React from 'react';
import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import Cards from './Cards';
import nock from 'nock';

test('renders Cards component', () => {
    render(<Cards dark={false} />);

    // Assert that the Cards component is rendered correctly
    const cardsComponent = screen.getByTestId('cards-component');
    expect(cardsComponent).toBeInTheDocument();
});

test('updates city select value', () => {
    render(
        <Cards
            data={[
                { id: 1, location: 'London' },
                { id: 2, location: 'New York' },
                { id: 3, location: 'Paris' },
            ]}
        />
    );
    const citySelect = screen.getByTestId('city-select');
    expect(citySelect).toBeInTheDocument();
});

describe("delete job", () => {
    afterEach(() => {
        nock.cleanAll();
    });
    it('deletes job', async () => {
        // Mock the API request using nock
        const scope = nock('http://localhost:5000')
            .delete('/api/jobs/1')
            .reply(200, { success: true });

        // Render the component
        render(<Cards show={true} handleClose={() => {}} />);

        // Submit the form
        fireEvent.click(screen.getByTestId('delete-button'));

        // Wait for the API request to complete
        await waitFor(() => expect(scope.isDone()).toBe(true));

    });
});




// Add more tests for other functionalities and user interactions as needed
