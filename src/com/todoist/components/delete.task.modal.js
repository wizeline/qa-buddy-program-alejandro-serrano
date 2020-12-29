import { Selector } from 'testcafe';


class DeleteTaskModalDialog {

    /**
     * Initialize web elements.
     */
    constructor() {
        this.deleteDialog = Selector('div.alert_holder.delete_confirmation');
        this.deleteButton = Selector('button.ist_button.ist_button_red').withText('Delete');
        this.cancelButton = Selector('button.ist_button').withExactText('Cancel');
    }
}

export default new DeleteTaskModalDialog();