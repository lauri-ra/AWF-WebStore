import { rest } from 'msw';
import { players } from './players';

export const handlers = [
  rest.get('**/api/players', (req, res, ctx) => {
    return res(ctx.json(players.map(player => ({ id: player.id, name: player.name }))));
  }),

  rest.get('**/api/players/:playerId', (req, res, ctx) => {
    const { playerId } = req.params;
    if (/\D/.test(playerId)) {
      return res(ctx.status(404));
    }

    const player = players.find(pl => pl.id === Number.parseInt(playerId));
    if (!player) {
      return res(ctx.status(404));
    }

    return res(ctx.json({ ...player }));
  }),

  rest.delete('**/api/players/:playerId', (req, res, ctx) => {
    const { playerId } = req.params;
    if (/\D/.test(playerId)) {
      return res(ctx.status(404));
    }

    const player = players.find(pl => pl.id === Number.parseInt(playerId));
    if (!player) {
      return res(ctx.status(404));
    }

    return res(ctx.json({ ...player }));
  }),

  rest.post('**/api/players', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: players.length + 1,
        name: 'New Player',
        isActive: false
      })
    );
  }),

  rest.put('**/api/players/:playerId', (req, res, ctx) => {
    const { playerId } = req.params;
    if (/\D/.test(playerId)) {
      return res(ctx.status(404));
    }

    const player = players.find(pl => pl.id === Number.parseInt(playerId));
    if (!player) {
      return res(ctx.status(404));
    }

    return res(ctx.json({ ...player, ...req.body }));
  })
];
