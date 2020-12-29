import LoginPage from '../../../../src/com/todoist/pages/login.page.js';
import DashboardPage from '../../../../src/com/todoist/pages/dashboard.page.js';

require('dotenv').config({path: __dirname + '/./../../../../env/.env'});

const EMAIL = process.env.TODOIST_USER;
const PASSWORD = process.env.TODOIST_PASSWORD;
const INVALID_PASSWORD = 'Test';

fixture('Login Tests').page('https://todoist.com/');

test('Login successful', async t => {
    await LoginPage.login(EMAIL, PASSWORD);
    await t.expect(await DashboardPage.doesDashboardPageExists()).ok();
});

test('Login unsuccessful', async t => {
    await LoginPage.login(EMAIL, INVALID_PASSWORD);
    await t.expect(LoginPage.errorMessage.exists).ok();
});
