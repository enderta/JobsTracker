import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import Delete from "./Delete";
import nock from "nock";


describe("delete job", () => {
   it('deletes job', async () => {


            render(<Delete id={1}  />);
            const scope = nock('http://localhost:5000')
            .delete(`/api/jobs/1`)
            .reply(200, { success: true });
            fireEvent.click(screen.getByTestId('delete-button'));
            await waitFor(() => expect(scope.isDone()).toBe(true));

});
});