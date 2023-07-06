import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import Delete from "./Delete";
import nock from "nock";


describe("delete job", () => {
   it('deletes job', async () => {
         // Mock the API request using nock
         const scope = nock('http://localhost:5000')
              .delete('/api/jobs/1')
              .reply(200, { success: true });

         // Render the component


            render(<Delete  />);

         // Submit the form
         fireEvent.click(screen.getByTestId('delete-button'));

         // Wait for the API request to complete
         await waitFor(() => expect(scope.isDone()).toBe(true));
});
});