/** @format */

import players from '../../fixtures/players.json';
import {
	interceptIndefinitely,
	checkRequestStatus,
} from '../../support/utils';

describe('Requests: GET', () => {
	const playerIndex = 1;

	it('should render players in a list with id "#players-list"', () => {
		const getPlayers = interceptIndefinitely('**/api/players', players);
		cy.visit('/');
		checkRequestStatus("loading").then(() => {
			getPlayers.sendResponse();
			checkRequestStatus("finished");
			cy.get('#players-list')
				.find('li')
				.then(listItems => {
					expect(listItems.length).to.equal(3);
				});
			players.map(player => cy.contains('#players-list li', player.name));
		});
	});


	it('should render players as links inside list items', () => {
		const getPlayers = interceptIndefinitely('**/api/players', players);
		cy.visit('/');
		checkRequestStatus("loading").then(() => {
			getPlayers.sendResponse();
			checkRequestStatus("finished");
			players.map(player =>
				cy.contains('#players-list li a', player.name).should('have.attr', 'href')
			);
		});
	});

	it('should not show player status before a link is clicked', () => {
		const getPlayers = interceptIndefinitely('**/api/players', players);
		cy.visit('/');
		checkRequestStatus("loading").then(() => {
			getPlayers.sendResponse();
			checkRequestStatus("finished");

			cy.get('#selected-player').should('not.exist');
		});
	});

	it('should show player status when player link is clicked', () => {
		const getPlayers = interceptIndefinitely('**/api/players', players);
		cy.visit('/');
		checkRequestStatus("loading").then(() => {
			getPlayers.sendResponse();
			checkRequestStatus("finished");
			const getPlayer = interceptIndefinitely(
				`**/api/players/${players[playerIndex].id}`,
				players[playerIndex]
			);
			cy.get('#players-list li').eq(playerIndex).find('a').click();
			checkRequestStatus("loading").then(() => {
				getPlayer.sendResponse();
				checkRequestStatus("finished");


				cy.get('#selected-player').within(() => {
					cy.get('#player-name').contains(players[playerIndex].name);
					cy.get('#player-status').contains(players[playerIndex].isActive ? 'active' : 'inactive');

				});
			});
		})
	});
});
