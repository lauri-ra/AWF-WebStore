import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../redux/store';

import App from '../App.jsx';
import { players } from '../mocks/players';
import { rest, server } from '../mocks/server';
/* eslint-disable testing-library/no-node-access */

test('should fetch players from backend when first loaded', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  const listItems = await screen.findAllByRole('listitem');

  expect(listItems).toHaveLength(players.length);
  listItems.forEach((item, i) => {
    expect(item).toHaveAttribute('id', `player-${players[i].id}`);
  });
});

test('should show error status when loading players fails', async () => {
  server.use(
    rest.get('**/api/players', (req, res, ctx) => {
      return res(ctx.networkError('Network error'));
    })
  );

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(await screen.findByText('An error has occurred!!!')).toBeInTheDocument();
});

test('should fetch single player data from backend when link is clicked', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  const listItems = await screen.findAllByRole('listitem');
  const linkElement = listItems[0].querySelector('a');
  await UserEvent.click(linkElement);

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  expect(screen.getByText(players[0].name, { selector: '#player-name' })).toBeInTheDocument();
  expect(
    screen.getByText(`${players[0].isActive ? 'active' : 'inactive'}`, {
      selector: '#player-status'
    })
  ).toBeInTheDocument();
});
