import players from '../../fixtures/players.json';
import users from '../../fixtures/users.json';
import {
    interceptIndefinitely,
    checkRequestStatus,
    findAndClickButton,
    authFormExists,
    loginAs,
    checkPlayerInList,
} from '../../support/utils';

describe('Requests: REGISTER', () => {
    const user = users[0];
    const playersUrl = '**/api/players';

    it('should be able to succesfully complete the registration process', () => {
        cy.visit('/');
        // check that an anchor tag with the word register exists
        cy.get('a').contains('register').should('exist');
        // click the register link
        cy.get('a').contains('register').click();


        authFormExists(true);
        let getPlayers = interceptIndefinitely(playersUrl, players);
        const postUser = interceptIndefinitely('**/api/users', user);
        // find the element with id auth-username
        cy.get('#auth-username').type(user.username);
        // find the element with id auth-password
        cy.get('#auth-password').type(user.password);
        // submit the form
        cy.get('#auth-form').submit();

        checkRequestStatus('loading').then(() => {
            postUser.sendResponse();
            checkRequestStatus('loading').then(() => {
                getPlayers.sendResponse();
                checkRequestStatus('finished');
                authFormExists(false);
            });
        });
    });
    it('should not be able to register if post-request fails', () => {
        cy.visit('/');
        // check that an anchor tag with the word register exists
        cy.get('a').contains('register').should('exist');
        // click the register link
        cy.get('a').contains('register').click();

        authFormExists(true);
        // find the element with id auth-username
        cy.get('#auth-username').type(user.username);
        // find the element with id auth-password
        cy.get('#auth-password').type(user.password)
        // submit the form
        const postError = interceptIndefinitely('**/api/users', { forceNetworkError: true });
        cy.get('#auth-form').submit();
        checkRequestStatus('loading').then(() => {
            postError.sendResponse();
            checkRequestStatus('error')
            authFormExists(true);
        });
    })

});
