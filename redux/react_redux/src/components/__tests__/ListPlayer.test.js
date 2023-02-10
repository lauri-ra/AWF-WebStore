/** @format */

import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ListPlayer } from '../ListPlayer.jsx';
import configureMockStore from 'redux-mock-store';

const player = {
  id: 1,
  name: 'Player Name'
};

let mockStore;
beforeEach(() => {
  mockStore = configureMockStore();
  // const submitHandler = jest.fn();
});

test('renders a link with text content matching name prop', () => {
  const clickHandler = jest.fn();

  render(
    <Provider store={mockStore({})}>
      <ListPlayer {...player} onClick={clickHandler} />
    </Provider>
  );
  const linkElement = screen.getByRole('link');
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveTextContent(player.name);
});

test('onClick callback is called when link is clicked', () => {
  const clickHandler = jest.fn();
  render(
    <Provider store={mockStore({})}>
      <ListPlayer onClick={clickHandler} {...player} />
    </Provider>
  );

  const linkElement = screen.getByRole('link');
  fireEvent.click(linkElement);

  expect(clickHandler).toHaveBeenCalledTimes(1);
  expect(clickHandler.mock.calls[0][0]).toBe(player.id);
});
