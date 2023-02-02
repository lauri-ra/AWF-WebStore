import { fireEvent, render, screen } from '@testing-library/react';
import { ListPlayer } from '../ListPlayer.jsx';

const player = {
  id: 1,
  name: 'Player Name'
};

test('renders a link with text content matching name prop', () => {
  render(<ListPlayer onClick={() => {}} {...player} />);
  const linkElement = screen.getByRole('link');
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveTextContent(player.name);
});

test('onClick callback is called when link is clicked', () => {
  const clickHandler = jest.fn();
  render(<ListPlayer onClick={clickHandler} {...player} />);

  const linkElement = screen.getByRole('link');
  fireEvent.click(linkElement);

  expect(clickHandler).toHaveBeenCalledTimes(1);
  expect(clickHandler.mock.calls[0][0]).toBe(player.id);
});
