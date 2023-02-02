import { render, screen } from '@testing-library/react';
import { ListPlayers } from '../ListPlayers.jsx';

test('renders a list with id "players-list"', () => {
  render(<ListPlayers players={[]} selectPlayer={() => {}} />);
  const listElem = screen.getByRole('list');
  expect(listElem).toBeInTheDocument();
  expect(listElem).toHaveAttribute('id', 'players-list');
});

test('list contains as many items as there are players in players prop', () => {
  const players = [
    {
      id: 1,
      name: 'Player One',
      isActive: true
    },
    {
      id: 2,
      name: 'Player Two',
      isActive: false
    }
  ];

  render(<ListPlayers players={players} selectPlayer={() => {}} />);
  const listItems = screen.getAllByRole('listitem');
  expect(listItems.length).toBe(players.length);
});

test('list items have ids of the form "player-{id}"', () => {
  const players = [
    {
      id: 1,
      name: 'Player One',
      isActive: true
    },
    {
      id: 2,
      name: 'Player Two',
      isActive: false
    }
  ];

  render(<ListPlayers players={players} selectPlayer={() => {}} />);
  const listItems = screen.getAllByRole('listitem');

  listItems.forEach((item, i) => {
    expect(item).toHaveAttribute('id', `player-${players[i].id}`);
  });
});

test('list items contain links to players', () => {
  const players = [
    {
      id: 1,
      name: 'Player One',
      isActive: true
    },
    {
      id: 2,
      name: 'Player Two',
      isActive: false
    }
  ];

  render(<ListPlayers players={players} selectPlayer={() => {}} />);
  const listItems = screen.getAllByRole('listitem');
  const linkItems = screen.getAllByRole('link');

  listItems.forEach((item, i) => {
    expect(item).toContainElement(linkItems[i]);
  });
});
