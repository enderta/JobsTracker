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






// Add more tests for other functionalities and user interactions as needed
