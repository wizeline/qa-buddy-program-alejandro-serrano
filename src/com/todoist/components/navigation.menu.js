import { Selector } from 'testcafe';


class NavigationMenu {

    /**
     * Initialize web elements.
     */
    constructor() {
        this.inboxMenuItem = Selector('#filter_inbox');
        this.todayMenuItem = Selector('#filter_today');
        this.upcomingMenuItem = Selector('#filter_upcoming');
    }
}

export default new NavigationMenu();