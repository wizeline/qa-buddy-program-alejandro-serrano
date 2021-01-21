import { Selector, t } from 'testcafe';


class HomePage {

    /**
     * Constructor. Initialize web elements
     */
    constructor() {
        this.loginLink = Selector('a').withAttribute('href', '/users/showlogin');
    }

    /**
     * Clicks on the Login link to navigate to the Login Page.
     */
    async navigateToLoginPage() {
        await t.click(this.loginLink);
    }
}

export default new HomePage();