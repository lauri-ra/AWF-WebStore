/** @format */

import players from '../../fixtures/players.json';
import {
	interceptIndefinitely,
	checkRequestStatus,
	findAndClickButton,
} from '../../support/utils';

describe('Requests: POST', () => {
	const playersUrl = '**/api/players';

	it('should be able to successfully add a new player to the backend, and then to the list of players', () => {
		let getPlayers = interceptIndefinitely(playersUrl, players);
		const newPlayer = { name: 'New Player', id: 1, isActive: true };

		cy.visit('/');
		cy.get('#request-status')
			.contains('loading', { matchCase: false })
			.then(() => {
				getPlayers.sendResponse();
				checkRequestStatus('finished');
				// find the input-player element and type in a name
				cy.get('#input-player').type(newPlayer.name);
				// Expect the input to have the value we typed
				cy.get('#input-player').should('have.value', newPlayer.name);

				const postPlayer = interceptIndefinitely(playersUrl, {
					body: { ...newPlayer },
					statusCode: 201,
				});
				findAndClickButton('add');
				cy.get('#input-player').should('have.value', '');
				checkRequestStatus('loading').then(() => {
					postPlayer.sendResponse();
					checkRequestStatus('finished');
					// Expect the new player to be in the list
					cy.get('#players-list li').should('have.length', players.length + 1);
					cy.get('#players-list li')
						.eq(players.length)
						.should('contain', newPlayer.name);
				});
			});
	});

	it('Should not add a new player if POST request fails', () => {
		let getPlayers = interceptIndefinitely(playersUrl, players);
		const newPlayer = { name: 'New Player', id: 1, isActive: true };

		cy.visit('/');
		cy.get('#request-status')
			.contains('loading', { matchCase: false })
			.then(() => {
				getPlayers.sendResponse();
				checkRequestStatus('finished');
				// find the input-player element and type in a name
				cy.get('#input-player').type(newPlayer.name);
				// Expect the input to have the value we typed
				cy.get('#input-player').should('have.value', newPlayer.name);
				// Click the add button
				// Expect the input to be empty
				const postError = interceptIndefinitely(playersUrl, {
					forceNetworkError: true,
				});
				findAndClickButton('add');
				cy.get('#input-player').should('have.value', '');
				checkRequestStatus('loading').then(() => {
					postError.sendResponse();
					checkRequestStatus('error');
					// Expect the new player not to be in the list
					cy.get('#players-list li').should('have.length', players.length);
					// check new players name is not in the list
					cy.get('#players-list li').should('not.contain', newPlayer.name);
				});
			});
	});
});
