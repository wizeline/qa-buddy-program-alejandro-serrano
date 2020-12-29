import { Selector, t } from 'testcafe';
import HomePage from '../pages/home.page';


class LoginPage {

    /**
     * Constructor. Initialize web elements
     */
    constructor() {
        this.emailInput = Selector('#email');
        this.passwordInput = Selector('#password');
        this.loginButton = Selector('.submit_btn');
        this.errorMessage = Selector('.error_msg > span');
    }

    /**
     * Login to the application with the given credentials.
     *
     * @param {string} email Email.
     * @param {string} password Password.
     */
    async login(email, password) {
        await HomePage.navigateToLoginPage();
        await t
            .typeText(this.emailInput, email, {paste: true, replace: true})
            .typeText(this.passwordInput, password, {paste: true, replace: true})
            .click(this.loginButton);
    }
}

export default new LoginPage();
