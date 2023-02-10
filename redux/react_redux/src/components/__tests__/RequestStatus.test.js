/** @format */

import { render, screen } from '@testing-library/react';
import { RequestStatus } from '../RequestStatus.jsx';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

let mockStore;
beforeEach(() => {
  mockStore = configureMockStore();
  // const submitHandler = jest.fn();
});

test('renders with text content matching status prop', () => {
  const store = mockStore({
    status: 'status'
  });
  render(
    <Provider store={store}>
      <RequestStatus />
    </Provider>
  );
  const statusElement = screen.getByText('status');
  expect(statusElement).toBeInTheDocument();
});

test('renders with id "request-status"', () => {
  const store = mockStore({
    status: 'status'
  });
  render(
    <Provider store={store}>
      <RequestStatus />
    </Provider>
  );

  const statusElement = screen.getByText('status');
  expect(statusElement).toBeInTheDocument();
  expect(statusElement).toHaveAttribute('id', 'request-status');
});
