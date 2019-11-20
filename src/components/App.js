import { Component } from "react";
import { PropTypes } from "prop-types";

import * as readOnlyApplicationData from "../../data/read_only_application_data";

// Custom Components
import Add_Expense_Button from "./Buttons/Add_Expense_Button";
import Add_Expense_Group_UI_Button from "./Buttons/Add_Expense_Group_UI_Button";
import Edit_Expense_Group_Button from "./Buttons/Edit_Expense_Group_Button";
import Expense_Group from "./Expense_Groups/Expense_Group";
import Groups_Window from "./Groups_Window";
import Main_Menu from "./Menus/Main_Menu";
import Options_Dialog from "./Options_Dialogs/Options_Dialog";
import Expense_Group_Options_Dialog from "./Options_Dialogs/Expense_Group_Options_Dialog";
import Top_App_Bar from "./Top_App_Bar";

// Redux Actions
import {
	resetAppData,
	editApplicationOption,
	closeAppOptionsDialog,
} from "../actions/application_actions";

import { closeMainMenu } from "../actions/user_interface_actions"
import { saveEntity, editEntity, cancelEditEntity } from "../actions/entity_actions";
import { addExpenseGroup, addExpenseGroupChild } from "../actions/expense_group_actions";

// Helper Functions
import { obtainChildCostTotal } from "../helpers/helpers";
import Stats_Window_Item from "./Stats_Windows/Stats_Window_Item";

/**
 * Overall controller for the App.
 */
class App extends Component {

	constructor( props ) {
		super( props );
		this.handleClick = this.handleClick.bind(this);
		this.handleKeypress = this.handleKeypress.bind(this);
		this.expense_group_children = store.getState().expense_group_child_by_id;
	}

	getChildContext() {
		return {
			store : this.props.store,
		};
	}

	componentDidCatch(error, info) {
		console.error(error, info);
	}

	componentWillMount() {
		this.unsubscribe = store.subscribe(
			() => this.forceUpdate()
		);
	}

	componentWillUnmount() {
		this.unsubscribe();
		window.removeEventListener("click", this.handleClick);
		window.removeEventListener("keydown",  this.handleKeypress);
	}

	componentDidMount() {
	/**
	 * On this global subscription, I want to remove editing state from expense group children
	 * if we are not clicking on that actual element in the dom.
	 *
	 * Each child expense has an outer "data-id" parameter on it. On a click, we reference the current element, as well
	 * as loop up parent elements and reference those. We remove edit state if we cannot find a data-id.
	 */
		window.addEventListener("click", this.handleClick);
		window.addEventListener("keydown", this.handleKeypress);

		if ( process.env.NODE_ENV === "development" )
		{
			store.dispatch(resetAppData());
			store.dispatch(addExpenseGroup({}));
		}
	}

	/**
	 * Handles clicks on a global application level.
	 * Put event through through an algorithm that determines
	 * whether our click target is a child of an expense_group.
	 *
	 * If that is the case, remove edit status from all
	 * expense group children that are actively being edited
	 * *except for* the one being clicked.
	 *
	 * This is what explicitly controls the functionality
	 * in which there is only one editable expense group child
	 * available at a time.
	 */
	handleClick( e ) {
		let clickTarget = e.target;
		let childID = null;

		const { expense_group_child_by_id } = store.getState();

		while ( ! childID && clickTarget && clickTarget !== document )
		{
			if (clickTarget.dataset) {
				childID = clickTarget.dataset.id;
			}

			clickTarget = clickTarget.parentNode;
		}

		for ( let i = 0; i < Object.keys( expense_group_child_by_id ).length; i++ )
		{
			let id = Object.keys( expense_group_child_by_id )[i];

			if ( id === childID )
			{
				continue;
			}

			const childData = expense_group_child_by_id[ id ];

			if ( childData.edit )
			{
				store.dispatch(saveEntity({ id }));
			}
		}
	}

	/**
	 * Handles keyboard actions on a global level of this component.
	 * These affect any expense group child that is currently being edited.
	 */
	handleKeypress( e ) {
		let dispatchAction;
		let keyCode = e.which;
		const { expense_group_child_by_id } = store.getState();

		switch ( keyCode ) {
			case 13: // Enter Key
				dispatchAction = saveEntity;
				break;
			case 27: // Escape Key
				dispatchAction = cancelEditEntity;
				break;
			default:
				dispatchAction = null;
				break;
		}

		let childID = Object.keys( expense_group_child_by_id ).filter( id => expense_group_child_by_id[id].edit )[0];

		if ( dispatchAction && childID )
		{
			store.dispatch( dispatchAction({ id : childID }) );
		}
	}


	render() {
		const {
			application_options,
			user_interface,
			expense_groups,
			expense_group_by_id,
			expense_group_children,
			expense_group_child_by_id
		} = store.getState();

		const { dialog_open, ...optionsValues } = application_options;
		const updateApplicationOptions = (event) => {
			store.dispatch(editApplicationOption({
				[event.target.name]: event.target.value
			}));
		};
		const handleAppOptionsDialogClose = () => store.dispatch(closeAppOptionsDialog());
		const handleExpenseGroupOptionsDialogClose = ( id ) => store.dispatch(closeExpenseGroupOptionsDialog({ id }));

		const application_total_cost = obtainChildCostTotal(
			expense_group_children,
			expense_group_child_by_id,
			application_options
		);
		const application_metrics = [
			<Stats_Window_Item label="Groups" value={expense_groups.length} />,
			<Stats_Window_Item label="Expenses" value={expense_group_children.length} />,
			<Stats_Window_Item label="Total Cost" value={`${application_total_cost}/${application_options.costUOM}`} />
		];

		/**
		 * Expense Group Specific Items
		 */
		const expense_groups_with_add_button = Object.keys(expense_group_by_id).map( id  => {
			const groupData = expense_group_by_id[id];
			const { title, description } = groupData;

			// Main functionality Buttons
			const primary_buttons = [
				<Add_Expense_Button action={addExpenseGroupChild({ parentID: id })} />,
				<Edit_Expense_Group_Button action={editEntity({ id, title, description })} />
			];

			// Delete and Expense Group Options Button
			const administrative_buttons = [

			];

			// Buttons seen when editing the group
			const edit_view_buttons = [

			];
			return (
				<Expense_Group
					id={id}
					key={`expense-group-${id}`}
					buttons_primary={primary_buttons}
					buttons_admin={administrative_buttons}
					buttons_editing={edit_view_buttons}
					{...groupData}/>
			)
		}
		).concat([
			<Add_Expense_Group_UI_Button key={`expense-group-add-button`} action={() => store.dispatch(addExpenseGroup())}/>
		]);

		return (
			<div className="business-calculator">
				<Top_App_Bar metrics={application_metrics}/>
				<Groups_Window>{expense_groups_with_add_button}</Groups_Window>
				<Main_Menu
					onMenuClose={() => store.dispatch(closeMainMenu())}
					isMenuOpen={user_interface.main_menu_open}
					metrics={application_metrics}
				/>
				<Options_Dialog
					onChange={updateApplicationOptions}
					onClose={handleAppOptionsDialogClose}
					open={dialog_open}
					options_values={optionsValues}
					options_values_labels={readOnlyApplicationData["application_options_labels"]}
					options_values_list={readOnlyApplicationData["application_options"]}
					title="Application"
				/>
				<Expense_Group_Options_Dialog
					groups={expense_group_by_id}
					onChange={updateExpenseGroupOptions}
					onClose={handleExpenseGroupOptionsDialogClose}
					options={expense_group_options}
					options_values_labels={readOnlyGroupData["expense_group_options_labels"]}
					options_values_list={readOnlyGroupData["expense_group_options"]}
				/>
				<Options_Dialog
					labelType="expense_group"
					onChange={updateExpenseGroupOptions}
					onClose={handleExpenseGroupOptionsDialogClose}
					open={expense_group_dialog_open}
					options_values={optionsValues}
					title={props.title}
				/>
			</div>
		);
	}
}

App.propTypes = {
	store: PropTypes.object.isRequired,
};

App.childContextTypes = {
	store : PropTypes.object.isRequired,
};

export { App }