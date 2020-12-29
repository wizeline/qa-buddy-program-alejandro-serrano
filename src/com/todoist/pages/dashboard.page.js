import { Selector, t } from 'testcafe';
import NavigationMenu from '../components/navigation.menu.js';
import InboxPage from '../pages/inbox.page.js';


class DashboardPage {

    /**
     * Initialize web elements.
     */
    constructor() {
        this.todoistApp = Selector('#todoist_app');
    }

    /**
     * Returns true if the main div container of the start page exists. Otherwise, false.
     */
    async doesDashboardPageExists() {
        return await this.todoistApp.exists;
    }

    /**
     * Navigates to Inbox Dashboard.
     */
    async navigateToInboxDashboard() {
        await t.click(NavigationMenu.inboxMenuItem);
    }

    /**
     * Navigates to Today Dashboard.
     */
    async navigateToTodayDashboard() {
        await t.click(NavigationMenu.todayMenuItem);
    }

    /**
     * Navigates to Upcoming Dashboard.
     */
    async navigateToUpcomingDashboard() {
        await t.click(NavigationMenu.upcomingMenuItem);
    }

    /**
     * Adds a new task with the given description from the Inbox Dashboard.
     *
     * @param {string} description Task identifier
     */
    async addTaskFromInbox(description) {
        await this.navigateToInboxDashboard();
        await InboxPage.addTask(description);
    }

    /**
     * Deletes a task with the given description from the Inbox Dashboard.
     *
     * @param {string} description Task identifier
     */
    async deleteTaskFromInbox(description) {
        await this.navigateToInboxDashboard();
        await InboxPage.deleteTask(description);
    }

    async deleteAllTasksFromInbox() {
        await this.navigateToInboxDashboard();
        await InboxPage.deleteAllTasks();
    }

    /**
     * Returns true if the given task is in the Inbox Dashboard. Otherwise, false.
     *
     * @param {string} description
     */
    async isTaskInTaskInboxItemsList(description) {
        await this.navigateToInboxDashboard();
        return await InboxPage.isTaskInTasksList(description);
    }
}

export default new DashboardPage();
