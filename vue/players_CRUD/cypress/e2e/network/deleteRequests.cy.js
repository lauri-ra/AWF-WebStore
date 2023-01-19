/** @format */

import players from '../../fixtures/players.json';
import {
	interceptIndefinitely,
	clickListPlayer,
	checkRequestStatus,
	updateShouldBe,
	checkboxStatus,
	checkboxStatusShouldBe,
	updateButtonShouldBe,
	clickUpdateButton,
	checkCheckbox,
	findAndClickButton,
} from '../../support/utils';

describe('Requests: DELETE', () => {
	const playerIndex = 1;
	const playerUrl = `**/api/players/${players[playerIndex].id}`;

	it('should successfully complete deleting a player', () => {
		cy.intercept('GET', '**/api/players', players).as('getPlayer');
		cy.intercept('DELETE', '**/api/players/*', players[playerIndex]).as(
			'deletePlayer'
		);
		const getPlayer = interceptIndefinitely(playerUrl, {
			...players[playerIndex],
		});

		cy.visit('/');
		// Check that the player is in the list
		cy.get('#players-list').should('contain', players[playerIndex].name);

		clickListPlayer(playerIndex);
		checkRequestStatus('Loading').then(() => {
			getPlayer.sendResponse();
			checkRequestStatus('Finished!');

			const deletePlayer = interceptIndefinitely(playerUrl, {
				...players[playerIndex],
			});
			findAndClickButton('delete');
			checkRequestStatus('loading').then(() => {
				deletePlayer.sendResponse();
				checkRequestStatus('finished');
				// Check that the player is no longer in the list
				cy.get('#players-list').should(
					'not.contain',
					players[playerIndex].name
				);
			});
		});
	});

	it('should not delete a player if DELETE-request fails', () => {
		cy.intercept('GET', '**/api/players', players).as('getPlayer');
		cy.intercept('DELETE', '**/api/players/*', players[playerIndex]).as(
			'deletePlayer'
		);
		const getPlayer = interceptIndefinitely(playerUrl, {
			...players[playerIndex],
		});

		cy.visit('/');

		// Check that the player is in the list
		cy.get('#players-list').should('contain', players[playerIndex].name);
		clickListPlayer(playerIndex);

		checkRequestStatus('Loading').then(() => {
			getPlayer.sendResponse();
			checkRequestStatus('Finished!');

			const deleteError = interceptIndefinitely(playerUrl, {
				forceNetworkError: true,
			});
			findAndClickButton('delete');
			checkRequestStatus('Loading').then(() => {
				deleteError.sendResponse();
				checkRequestStatus('error');
				// Check that the player is still in the list
				cy.get('#players-list').should('contain', players[playerIndex].name);
			});
		});
	});
});
