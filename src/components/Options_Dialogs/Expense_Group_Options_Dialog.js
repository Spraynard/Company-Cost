import Options_Dialog from "./Options_Dialog";

/**
 * Creating this component to compose over Options_Dialog
 * in order to show the options data for the current Expense Group
 * in which we are trying to change options.
 *
 * Basically, we perform all the data handling through this component
 * and just feed it to the dialog.
 */
const Expense_Group_Options_Dialog = ({ options }) => {
    // Is there any expense group saying to open this dialog?
    const isDialogOpen = Object.keys(options).reduce(( isOpen, id ) => {
        const { dialog_open } = options[id];
        if ( isOpen || (!isOpen && dialog_open) )
        {
            return true
        }
        return false;
    }, false);

    <Options_Dialog open={isDialogOpen} />
}

export default Expense_Group_Options_Dialog;