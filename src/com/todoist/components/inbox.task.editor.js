import { Selector } from 'testcafe';


class InboxTaskEditor {

    /**
     * Initialize web elements.
     */
    constructor() {
        this.taskListContainer = Selector('div').withAttribute('data-testid', 'project-list-view');
        this.taskDescription = Selector('div.public-DraftEditor-content');
        this.addTaskButton = Selector('button.ist_button.ist_button_red');
        this.cancelButton = Selector('button.cancel');
    }
}

export default new InboxTaskEditor();