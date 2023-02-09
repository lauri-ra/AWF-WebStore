import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { RequestStatus } from '../RequestStatus';

let mockStore;
beforeEach(() => {
  const middlewares = [thunk];
  mockStore = configureMockStore(middlewares);
  // const submitHandler = jest.fn();
});

test('renders with text content matching status prop', () => {
  render(
    <Provider store={mockStore({ status: 'status' })}>
      <RequestStatus />
    </Provider>
  );
  const statusElement = screen.getByText('status');
  expect(statusElement).toBeInTheDocument();
});

test('renders with id "request-status"', () => {
  render(
    <Provider store={mockStore({ status: 'status' })}>
      <RequestStatus />
    </Provider>
  );
  const statusElement = screen.getByText('status');
  expect(statusElement).toBeInTheDocument();
  expect(statusElement).toHaveAttribute('id', 'request-status');
});
