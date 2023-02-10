/** @format */

import { rest } from 'msw';
import { players } from './players';

const getAllPlayers = (req, res, ctx) => {
	return res(
		ctx.json(players.map((player) => ({ id: player.id, name: player.name })))
	);
};

const getOnePlayer = (req, res, ctx) => {
	const { playerId } = req.params;
	if (/\D/.test(playerId)) {
		return res(ctx.status(404));
	}

	const player = players.find((pl) => pl.id === Number.parseInt(playerId));
	if (!player) {
		return res(ctx.status(404));
	}

	return res(ctx.json({ ...player }));
};

const deleteOnePlayer = (req, res, ctx) => {
	const { playerId } = req.params;
	if (/\D/.test(playerId)) {
		return res(ctx.status(404));
	}

	const player = players.find((pl) => pl.id === Number.parseInt(playerId));
	if (!player) {
		return res(ctx.status(404));
	}

	return res(ctx.json({ ...player }));
};

const addNewPlayer = (req, res, ctx) => {
	return res(
		ctx.status(201),
		ctx.json({
			id: players.length + 1,
			name: 'New Player',
			isActive: false,
		})
	);
};

const updatePlayer = (req, res, ctx) => {
	const { playerId } = req.params;
	if (/\D/.test(playerId)) {
		return res(ctx.status(404));
	}

	const player = players.find((pl) => pl.id === Number.parseInt(playerId));
	if (!player) {
		return res(ctx.status(404));
	}

	const updatedPlayer = { ...player, ...req.body };
	updatePlayer.id = Number.parseInt(playerId);

	return res(ctx.json({ ...updatedPlayer }));
};

export const handlers = [
	rest.get('**/api/players', getAllPlayers),
	rest.get('**/api/players/:playerId', getOnePlayer),
	rest.delete('**/api/players/:playerId', deleteOnePlayer),
	rest.post('**/api/players', addNewPlayer),
	rest.put('**/api/players/:playerId', updatePlayer),
];
