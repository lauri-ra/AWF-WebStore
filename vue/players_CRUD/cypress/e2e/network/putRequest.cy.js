/** @format */

import players from '../../fixtures/players.json';
import {
	interceptIndefinitely,
	clickListPlayer,
	checkRequestStatus,
	checkboxStatusShouldBe,
	updateButtonShouldBe,
	clickUpdateButton,
	checkCheckbox,
	selectedShouldBe,
} from '../../support/utils';

const stateUpdateCheck = (playerIndex, players) => {
	const oldPlayer = players[playerIndex];
	const updatedPlayer = structuredClone(oldPlayer);
	updatedPlayer.isActive = !oldPlayer.isActive;
	const url = `**/api/players/${players[playerIndex].id}`;
	cy.intercept('GET', '**/api/players', players).as('getPlayers');
	cy.intercept('PUT', '**/api/players/*', updatedPlayer).as('updatePlayer');
	let getPlayer = interceptIndefinitely(url, { ...oldPlayer });

	cy.visit('/');
	clickListPlayer(playerIndex);

	checkRequestStatus('loading').then(() => {
		getPlayer.sendResponse();
		checkRequestStatus('Finished!');
		cy.get('#selected-player').should('exist');
		// Check the players name is the same as the one in the list
		selectedShouldBe(oldPlayer.name);
		updateButtonShouldBe('disabled');
		checkboxStatusShouldBe(updatedPlayer.isActive ? 'unchecked' : 'checked');
		checkCheckbox();
		checkboxStatusShouldBe(updatedPlayer.isActive ? 'checked' : 'unchecked');
		updateButtonShouldBe('enabled');

		getPlayer = interceptIndefinitely(url, { ...updatedPlayer });

		clickUpdateButton();
		checkRequestStatus('loading').then(() => {
			getPlayer.sendResponse();
			checkRequestStatus('finished');
			clickListPlayer(playerIndex);
			selectedShouldBe(oldPlayer.name);
			updateButtonShouldBe('disabled');
			checkboxStatusShouldBe(updatedPlayer.isActive ? 'checked' : 'unchecked');
		});
	});
};

describe('Requests: PUT', () => {
	it('should be able to update a players active-state correctly in the frontend and the backend. ', () => {
		stateUpdateCheck(1, players);
		stateUpdateCheck(2, players);
	});

	it('Should not update the player if update fails.', () => {
		const playerIndex = 1;
		const oldPlayer = players[playerIndex];
		const updatedPlayer = structuredClone(oldPlayer);
		updatedPlayer.isActive = !oldPlayer.isActive;
		const url = `**/api/players/${players[playerIndex].id}`;
		cy.intercept('GET', '**/api/players', players).as('getPlayer');
		cy.intercept('PUT', '**/api/players/*', players[playerIndex]).as(
			'updatePlayer'
		);
		let getPlayer = interceptIndefinitely(url, { ...players[playerIndex] });

		cy.visit('/');
		clickListPlayer(playerIndex);
		cy.get('#request-status')
			.contains('loading', { matchCase: false })
			.then(() => {
				getPlayer.sendResponse();
				checkRequestStatus('finished');
				cy.get('#selected-player').should('exist');
				// Check the players name is the same as the one in the list
				selectedShouldBe(oldPlayer.name);
				updateButtonShouldBe('disabled');
				checkboxStatusShouldBe(
					updatedPlayer.isActive ? 'unchecked' : 'checked'
				);
				checkCheckbox();
				checkboxStatusShouldBe(
					updatedPlayer.isActive ? 'checked' : 'unchecked'
				);
				updateButtonShouldBe('enabled');

				const putError = interceptIndefinitely(url, {
					forceNetworkError: true,
				});
				clickUpdateButton();
				checkRequestStatus('loading').then(() => {
					putError.sendResponse();
					checkRequestStatus('error');
					getPlayer = interceptIndefinitely(url, { ...oldPlayer });
					clickListPlayer(playerIndex);
					checkRequestStatus('loading').then(() => {
						getPlayer.sendResponse();
						checkRequestStatus('finished');
						selectedShouldBe(oldPlayer.name);
						updateButtonShouldBe('disabled');
						checkboxStatusShouldBe(
							updatedPlayer.isActive ? 'unchecked' : 'checked'
						);
					});
				});
			});
	});
});
