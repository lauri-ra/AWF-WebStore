import { rest } from 'msw';
import { players } from './players';

const getAllPlayers = (req, res, ctx) => {
  return res(ctx.json(players.map(player => ({ id: player.id, name: player.name }))));
};

const getOnePlayer = (req, res, ctx) => {
  const { playerId } = req.params;
  if (/\D/.test(playerId)) {
    return res(ctx.status(404));
  }

  const player = players.find(pl => pl.id === Number.parseInt(playerId));
  if (!player) {
    return res(ctx.status(404));
  }

  return res(ctx.json({ ...player }));
};

export const handlers = [
  rest.get('**/api/players', getAllPlayers),

  rest.get('**/api/players/:playerId', getOnePlayer)
];
