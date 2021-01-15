import LoginPage from '../../../../src/com/todoist/pages/login.page.js';
import DashboardPage from '../../../../src/com/todoist/pages/dashboard.page.js';
import { generateTasks } from '../../../../src/com/todoist/utils/data.generator.js';

require('dotenv').config({path: __dirname + '/./../../../../env/.env'});

const EMAIL = process.env.TODOIST_USER;
const PASSWORD = process.env.TODOIST_PASSWORD;

const TASKS_DATA = generateTasks(10);

fixture('Tasks Tests')
    .page('https://todoist.com/')
    .beforeEach(async t => {
        await LoginPage.login(EMAIL, PASSWORD);
        await t.expect(await DashboardPage.doesDashboardPageExists()).ok();
    }).afterEach(async () => {
        await DashboardPage.deleteAllTasksFromInbox();
    });

test('Add Single Task', async t => {
    let taskName = 'Single Task';
    await DashboardPage.addTaskFromInbox(taskName);
    await t.expect(await DashboardPage.isTaskInTaskInboxItemsList(taskName)).ok();
});

TASKS_DATA.forEach(task => {
    test.skip(`Data-Driven Test ${task.id} - Add '${task.task_description}' Task`, async t => {
        let taskName = task.id + ' - ' + task.task_description;
        await DashboardPage.addTaskFromInbox(taskName);
        await t.expect(await DashboardPage.isTaskInTaskInboxItemsList(taskName)).ok();
    });
});