import { render, screen } from '@testing-library/react';
import { SelectedPlayer } from '../SelectedPlayer.jsx';

test('renders active player correctly', () => {
  const activePlayer = {
    id: 1,
    name: 'Active Player',
    isActive: true
  };

  render(<SelectedPlayer player={activePlayer} />);

  expect(
    screen.getByText(activePlayer.name, {
      selector: '#selected-player #player-name'
    })
  ).toBeInTheDocument();

  expect(
    screen.getByText('active', {
      selector: '#selected-player #player-status'
    })
  ).toBeInTheDocument();
});

test('renders inactive player correctly', () => {
  const inactivePlayer = {
    id: 2,
    name: 'Inactive Player',
    isActive: false
  };

  render(<SelectedPlayer player={inactivePlayer} />);

  expect(
    screen.getByText(inactivePlayer.name, {
      selector: '#selected-player #player-name'
    })
  ).toBeInTheDocument();

  expect(
    screen.getByText('inactive', {
      selector: '#selected-player #player-status'
    })
  ).toBeInTheDocument();
});
