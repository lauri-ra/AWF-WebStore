import { fireEvent, render, screen } from '@testing-library/react';
import { SelectedPlayer } from '../SelectedPlayer.jsx';

test('renders active player correctly', () => {
  const activePlayer = {
    id: 1,
    name: 'Active Player',
    isActive: true
  };

  render(<SelectedPlayer player={activePlayer} />);

  expect(
    screen.getByText(`${activePlayer.id}`, {
      selector: '#selected-player .player-id'
    })
  ).toBeInTheDocument();

  expect(
    screen.getByText(activePlayer.name, {
      selector: '#selected-player #player-name'
    })
  ).toBeInTheDocument();

  expect(
    screen.getByText('active', {
      selector: '#selected-player #player-status #checkbox-label'
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
    screen.getByText(`${inactivePlayer.id}`, {
      selector: '#selected-player .player-id'
    })
  ).toBeInTheDocument();

  expect(
    screen.getByText(inactivePlayer.name, {
      selector: '#selected-player #player-name'
    })
  ).toBeInTheDocument();

  expect(
    screen.getByText('inactive', {
      selector: '#selected-player #player-status #checkbox-label'
    })
  ).toBeInTheDocument();
});

test('renders "Delete" button with class "btn-delete"', () => {
  const activePlayer = {
    id: 1,
    name: 'Active Player',
    isActive: true
  };

  render(<SelectedPlayer player={activePlayer} />);
  const deleteButton = screen
    .getAllByRole('button')
    .find(button => button.classList.contains('btn-delete'));
  expect(deleteButton).toBeInTheDocument();
});

test('handleDelete callback is called when "Delete" button is clicked', () => {
  const deleteCallback = jest.fn();
  const activePlayer = {
    id: 1,
    name: 'Active Player',
    isActive: true
  };

  render(<SelectedPlayer player={activePlayer} handleDelete={deleteCallback} />);
  const deleteButton = screen
    .getAllByRole('button')
    .find(button => button.classList.contains('btn-delete'));
  fireEvent.click(deleteButton);

  expect(deleteCallback).toHaveBeenCalledTimes(1);
});

test('renders "Update" button with class "btn-update', () => {
  const activePlayer = {
    id: 1,
    name: 'Active Player',
    isActive: true
  };

  render(<SelectedPlayer player={activePlayer} />);
  const updateButton = screen
    .getAllByRole('button')
    .find(button => button.classList.contains('btn-update'));
  expect(updateButton).toBeInTheDocument();
});

test("renders checkbox with id 'checkbox'", () => {
  const activePlayer = {
    id: 1,
    name: 'Active Player',
    isActive: true
  };

  render(<SelectedPlayer player={activePlayer} />);
  const checkbox = screen.getByRole('checkbox', {
    selector: '#selected-player #player-status #checkbox-label #checkbox'
  });
  expect(checkbox).toBeInTheDocument();
});

test('"Update" button should be disabled initially', () => {
  const updateCallback = jest.fn();
  const activePlayer = {
    id: 1,
    name: 'Active Player',
    isActive: true
  };

  render(<SelectedPlayer player={activePlayer} handleUpdate={updateCallback} />);

  const updateButton = screen
    .getAllByRole('button')
    .find(button => button.classList.contains('btn-update'));
  expect(updateButton).toBeDisabled();
  expect(updateCallback).toHaveBeenCalledTimes(0);
});

test('"Update" button should be disabled when checkbox has been clicked an even number of times', () => {
  const updateCallback = jest.fn();
  const activePlayer = {
    id: 1,
    name: 'Active Player',
    isActive: true
  };

  render(<SelectedPlayer player={activePlayer} handleUpdate={updateCallback} />);
  const checkbox = screen.getByRole('checkbox', {
    selector: '#selected-player #player-status #checkbox-label #checkbox'
  });
  fireEvent.click(checkbox);
  fireEvent.click(checkbox);

  const updateButton = screen
    .getAllByRole('button')
    .find(button => button.classList.contains('btn-update'));
  expect(updateButton).toBeDisabled();
  expect(updateCallback).toHaveBeenCalledTimes(0);
});

test('handleUpdate callback is called when "Update" button is clicked and checkbox has been clicked an uneven number of times', () => {
  const updateCallback = jest.fn();
  const activePlayer = {
    id: 1,
    name: 'Active Player',
    isActive: true
  };

  render(<SelectedPlayer player={activePlayer} handleUpdate={updateCallback} />);

  const checkbox = screen.getByRole('checkbox', {
    selector: '#selected-player #player-status #checkbox-label #checkbox'
  });
  expect(checkbox).toBeInTheDocument();
  fireEvent.click(checkbox);
  fireEvent.click(checkbox);
  fireEvent.click(checkbox);

  const updateButton = screen
    .getAllByRole('button')
    .find(button => button.classList.contains('btn-update'));
  expect(updateButton).toBeEnabled();

  fireEvent.click(updateButton);
  expect(updateCallback).toHaveBeenCalledTimes(1);
});
