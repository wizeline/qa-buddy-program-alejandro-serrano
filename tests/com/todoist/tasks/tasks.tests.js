import LoginPage from '../../../../src/com/todoist/pages/login.page.js';
import DashboardPage from '../../../../src/com/todoist/pages/dashboard.page.js';
import { generateTasks } from '../../../../src/com/todoist/utils/data.generator.js';
import { Role } from 'testcafe';

require('dotenv').config({path: __dirname + '/./../../../../env/.env'});

const EMAIL = process.env.TODOIST_USER;
const PASSWORD = process.env.TODOIST_PASSWORD;

const TASKS_DATA = generateTasks(10);
const TASK_NAME = 'Single Task';

const user = Role('https://todoist.com/', async t => {
    await LoginPage.login(EMAIL, PASSWORD);
});

fixture('Tasks Tests')
    .page('https://todoist.com/');

test('Add Single Task', async t => {
    await t.useRole(user);
    await DashboardPage.addTaskFromInbox(TASK_NAME);
    await t.expect(await DashboardPage.isTaskInTaskInboxItemsList(TASK_NAME)).ok();
})
.after(async t => {
    await DashboardPage.deleteTaskFromInbox(TASK_NAME);
    await t.expect(await DashboardPage.isTaskInTaskInboxItemsList(TASK_NAME)).notOk();
});

test('Add multiple tasks', async t => {
    await t.useRole(user);
    for (let i = 0; i < TASKS_DATA.length; i++) {
        let taskName = TASKS_DATA[i].id + '-' + TASKS_DATA[i].task_description;
        await DashboardPage.addTaskFromInbox(taskName);
        await t.expect(await DashboardPage.isTaskInTaskInboxItemsList(taskName)).ok();
    }
});

test.skip('Delete multiple tasks', async t => {
    await t.useRole(user);
    for (let i = 0; i < TASKS_DATA.length; i++) {
        let taskName = TASKS_DATA[i].id + '-' + TASKS_DATA[i].task_description;
        await DashboardPage.deleteTaskFromInbox(taskName);
        await t.expect(await DashboardPage.isTaskInTaskInboxItemsList(taskName)).notOk();
    }
});

// FIXME: Weird behaviour in system under test when working with DDT
TASKS_DATA.forEach(task => {
    test.skip(`Data-Driven Test ${task.id} - Add '${task.task_description}' Task`, async t => {
        let taskName = task.id + ' - ' + task.task_description;
        await t.useRole(user);
        await DashboardPage.addTaskFromInbox(taskName);
        await t.expect(await DashboardPage.isTaskInTaskInboxItemsList(taskName)).ok();
    })
});
