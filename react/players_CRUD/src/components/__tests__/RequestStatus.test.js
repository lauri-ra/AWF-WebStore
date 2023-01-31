import { render, screen } from '@testing-library/react';
import { RequestStatus } from '../RequestStatus.jsx';

test('renders with text content matching status prop', () => {
  render(<RequestStatus status='status' />);
  const statusElement = screen.getByText('status');
  expect(statusElement).toBeInTheDocument();
});

test('renders with id "request-status"', () => {
  render(<RequestStatus status='status' />);
  const statusElement = screen.getByText('status');
  expect(statusElement).toBeInTheDocument();
  expect(statusElement).toHaveAttribute('id', 'request-status');
});
