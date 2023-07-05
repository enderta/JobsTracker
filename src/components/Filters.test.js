import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from './Filters';

test('updates search input value', () => {
    render(<Filters jobs={[]} />);
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'React' } });
    expect(searchInput.value).toBe('React');
});

test('updates city select value', () => {
    render(
        <Filters
            jobs={[
                { id: 1, location: 'London' },
                { id: 2, location: 'New York' },
                { id: 3, location: 'Paris' },
            ]}
        />
    );
    const citySelect = screen.getByTestId('city-select');
    fireEvent.select(citySelect, 'London');
    expect(citySelect.value).toBe('London');
});

test('updates job title select value', () => {
    render(
        <Filters
            jobs={[
                { id: 1, title: 'React Developer' },
                { id: 2, title: 'Node.js Developer' },
                { id: 3, title: 'Python Developer' },
            ]}
        />
    );
    const jobTitleSelect = screen.getByTestId('job-title-select');
    fireEvent.select(jobTitleSelect, 'React Developer');
    expect(jobTitleSelect.value).toBe('React Developer');
});



