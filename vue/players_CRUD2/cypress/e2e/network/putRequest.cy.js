/** @format */

import players from '../../fixtures/players.json';
import users from '../../fixtures/users.json';
import {
	interceptIndefinitely,
	clickListPlayer,
	checkRequestStatus,
	checkboxStatusShouldBe,
	updateButtonShouldBe,
	clickUpdateButton,
	checkCheckbox,
	selectedShouldBe,
	loginAs,
	authFormExists,
} from '../../support/utils';

const playersUrl = '**/api/players';
const user = users[0];

const stateUpdateCheck = (playerIndex, players) => {
	const oldPlayer = players[playerIndex];
	const updatedPlayer = structuredClone(oldPlayer);
	updatedPlayer.isActive = !oldPlayer.isActive;
	const playerUrl = `**/api/players/${players[playerIndex].id}`;
	cy.intercept('GET', '**/api/players', players).as('getPlayers');
	// cy.intercept('PUT', '**/api/players/*', updatedPlayer).as('updatePlayer');

	let getPlayers = interceptIndefinitely(playersUrl, players);
	cy.visit('/');
	authFormExists(true);
	loginAs(user)
	checkRequestStatus('loading').then(() => {
		getPlayers.sendResponse();
		checkRequestStatus('Finished!');
		authFormExists(false);

		let getPlayer = interceptIndefinitely(playerUrl, { ...oldPlayer });
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

			let putPlayer = interceptIndefinitely(playerUrl, { ...updatedPlayer });

			clickUpdateButton();
			checkRequestStatus('loading').then(() => {
				putPlayer.sendResponse();
				checkRequestStatus('finished');
				clickListPlayer(playerIndex);
				selectedShouldBe(oldPlayer.name);
				updateButtonShouldBe('disabled');
				checkboxStatusShouldBe(updatedPlayer.isActive ? 'checked' : 'unchecked');
			});
		});
	});
};

describe('Requests: PUT', () => {
	it('should be able to update a players active-state correctly in the frontend and the backend. ', () => {
		stateUpdateCheck(1, players);
		stateUpdateCheck(2, players);
	});

	it('should not update player if put request fails.', () => {
		const playerIndex = 1;
		const oldPlayer = players[playerIndex];
		const updatedPlayer = structuredClone(oldPlayer);
		updatedPlayer.isActive = !oldPlayer.isActive;
		const url = `**/api/players/${players[playerIndex].id}`;
		cy.intercept('GET', '**/api/players', players).as('getPlayer');
		cy.intercept('PUT', '**/api/players/*', players[playerIndex]).as(
			'updatePlayer'
		);
		const getPlayers = interceptIndefinitely(playersUrl, players);

		cy.visit('/');
		authFormExists(true);
		loginAs(user);
		checkRequestStatus('loading').then(() => {
			getPlayers.sendResponse();
			checkRequestStatus('Finished!');
			authFormExists(false);

			let getPlayer = interceptIndefinitely(url, { ...players[playerIndex] });
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
});
