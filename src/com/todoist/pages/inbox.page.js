import { Selector, t } from 'testcafe';
import InboxTaskEditor from '../components/inbox.task.editor.js';
import DeleteTaskModalDialog from '../components/delete.task.modal.js';


class InboxTask {

    constructor(taskDescription) {
        this.taskItemDescription = Selector('div.task_content').withExactText(taskDescription);
        this.taskItemCheckBox = Selector('button.task_checkbox').withExactText(taskDescription);
        this.taskContainer = this.taskItemDescription.parent('div').parent('div.task_list_item__content');
        this.taskMoreActionsButton = this.taskContainer.sibling('div.task_list_item__actions').child('.more_actions_button');
        this.taskMoreActionsDeleteTaskOption = Selector('li').withAttribute('data-action-hint','task-overflow-menu-delete');
    }
}

class InboxPage {

    constructor() {
        this.addTaskPlusButton = Selector('button.plus_add_button');
        this.taskList = Selector('div')
            .withAttribute('role', 'listbox')
            .find('ul.items');
    }

    async addTask(description) {
        await t.click(this.addTaskPlusButton);
        await t
            .typeText(InboxTaskEditor.taskDescription, description, {paste: true, replace: true})
            .click(InboxTaskEditor.addTaskButton);
    }

    async deleteTask(description) {
        let task = new InboxTask(description);
        await t
            .hover(task.taskContainer)
            .click(task.taskMoreActionsButton)
            .click(task.taskMoreActionsDeleteTaskOption);
        await t.click(DeleteTaskModalDialog.deleteButton);
    }

    async deleteAllTasks() {
        for (var i = 0; i < (await this.taskList.child('li').count); i++) {
            var taskDescription = await this.taskList.child('li').textContent;
            await this.deleteTask(taskDescription);
        }
    }

    async isTaskInTasksList(description) {
        let task = new InboxTask(description);
        return await task.taskItemDescription.exists;
    }
}

export default new InboxPage();