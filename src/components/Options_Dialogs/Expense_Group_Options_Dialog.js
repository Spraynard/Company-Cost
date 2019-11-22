import Options_Dialog from "./Options_Dialog"

/**
 * Creating this component to compose over Options_Dialog
 * in order to show the options data for the current Expense Group
 * in which we are trying to change options.
 *
 * Basically, we perform all the data handling through this component
 * and just feed it to the dialog.
 * @param [object] options - An object containing the options of each specific expense group.
 * @param [object] groups - An object containing the data of each group
 */
const Expense_Group_Options_Dialog = ({ options, groups, update_options_action, dialog_close_action, readOnlyGroupData,...props }) => {

    // Is there an expense group saying to open this dialog?
    const isDialogOpen = Object.keys(options).reduce(( isOpen, id ) => {
        const { dialog_open } = options[id];
        if ( isOpen || (!isOpen && dialog_open) )
        {
            return true
        }
        return false;
    }, false);

    // Adds the ID as a part of the object because we normally only have the id as a
    // reference of the object
    const contextualGroupOptions = Object.keys(groups)
        .map( group_id => ({ id : group_id, ...groups[group_id]}))
        .filter( group => options[group.id].dialog_open )
        .shift() || null;

    const { dialog_open, ...editable_options_values } = (contextualGroupOptions) ?
        options[contextualGroupOptions.id]
        :
        { dialog_open: false };

        console.log("Read Only Group Data")
        console.log(readOnlyGroupData);
        console.log(readOnlyGroupData["expense_group_options_labels"])
        console.log(readOnlyGroupData["expense_group_options"])

    return (
        <Options_Dialog
            open={isDialogOpen}
            options_values={editable_options_values}
            onChange={( contextualGroupOptions ) ? update_options_action(contextualGroupOptions.id ) : null}
            onClose={( contextualGroupOptions ) ? dialog_close_action(contextualGroupOptions.id ) : null}
            options_values_labels={readOnlyGroupData["expense_group_options_labels"]}
            options_values_list={readOnlyGroupData["expense_group_options"]}
            title={(contextualGroupOptions) ? contextualGroupOptions.title : ''}
            { ...props }
        />
        )
    }

export default Expense_Group_Options_Dialog;