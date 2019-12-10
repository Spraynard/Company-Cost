/* global store */
/* eslint-disable no-console */

import { Component } from "react";
import { PropTypes } from "prop-types";
import K from "../key_constants";

import readOnlyApplicationData from "../../data/read_only_application_data";
import readOnlyGroupData from "../../data/read_only_group_data.json";

// Custom Components
import Add_Expense_Button from "./Buttons/Add_Expense_Button";
import Add_Expense_Group_UI_Button from "./Buttons/Add_Expense_Group_UI_Button";
import Cancel_Expense_Group_Edit_Button from "./Buttons/Cancel_Expense_Group_Edit_Button";
import Edit_Expense_Group_Button from "./Buttons/Edit_Expense_Group_Button";
import Expense_Group from "./Expense_Groups/Expense_Group";
import Expense_Group_Child from "./Expense_Groups/Expense_Group_Child";
import Expense_Group_Table from "./Expense_Groups/Expense_Group_Table";
import Expense_Group_Options_Dialog from "./Options_Dialogs/Expense_Group_Options_Dialog";
import Groups_Window from "./Groups_Window";
import Main_Menu from "./Menus/Main_Menu";
import Options_Dialog from "./Options_Dialogs/Options_Dialog";
import Save_Expense_Group_Edit_Button from "./Buttons/Save_Expense_Group_Edit_Button";
import Top_App_Bar from "./Top_App_Bar";
import Expense_Group_Edit_Form from "./Expense_Group_Edit_Form";
import Remove_Expense_Group_Button from "./Buttons/Remove_Expense_Group_Button";
import Open_Expense_Group_Options_Dialog_Button from "./Buttons/Open_Expense_Group_Options_Dialog_Button";
import Typography from "@material-ui/core/Typography";

/** Redux Actions */
import {
	resetAppData,
	editApplicationOption,
	closeAppOptionsDialog,
} from "../actions/application_actions";

import { closeMainMenu } from "../actions/user_interface_actions";

import {
	cancelEditEntity,
	editEntity,
	editEntityOption,
	saveEntity,
	updateEntity
} from "../actions/entity_actions";

import {
	addExpenseGroup,
	addExpenseGroupChild,
	closeExpenseGroupOptionsDialog,
	openExpenseGroupOptionsDialog,
	removeExpenseGroup,
	removeExpenseGroupChild
} from "../actions/expense_group_actions";

/** Helper Functions */
import {
	obtainChildCostTotal,
	obtainExpenseGroupChildren,
	reduceToBooleanByBoolean
} from "../helpers/helpers";

/** Validation Functions */
import { expense_group_child_validator } from "../validators";

/**
 * Overall controller for the App.
 */
class App extends Component {

	constructor( props ) {
		super( props );
		this.expense_group_children = store.getState().expense_group_child_by_id;
		this.handleKeypress = this.handleKeypress.bind(this);
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
			store.dispatch(addExpenseGroup());
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
	 */
	handleClick(e) {
		let clickTarget = e.target;
		let child_id = null;
		const { expense_group_child_by_id } = store.getState();
		const expense_group_children_count = Object.keys(expense_group_child_by_id).length;

		/**
		 * Finds id of item we clicked (hopefully)
		 */
		while (!child_id && clickTarget && clickTarget !== document) {
			if (clickTarget.dataset) {
				child_id = clickTarget.dataset.id;
			}

			clickTarget = clickTarget.parentNode;
		}

		/**
		 * Remove edit status from every other expense group except the one currently being edited.
		 */
		for (let i = 0; i < expense_group_children_count; i++) {
			let reference_child_id = Object.keys(expense_group_child_by_id)[i];

			if (reference_child_id === child_id) {
				continue;
			}

			const child_data = expense_group_child_by_id[reference_child_id];

			if (child_data.edit) {
				store.dispatch(saveEntity({ id: reference_child_id }));
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
			case K.ENTER_KEY:
				dispatchAction = saveEntity;
				break;
			case K.ESCAPE_KEY:
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
			expense_group_by_id,
			expense_group_child_by_id,
			expense_group_children,
			expense_group_entity_edit,
			expense_group_options,
			expense_groups,
			user_interface,
		} = store.getState();

		const { dialog_open, ...optionsValues } = application_options;

		const update_application_options = (event) => {
			store.dispatch(editApplicationOption({
				[event.target.name]: event.target.value
			}));
		};

		const update_expense_group_options = id => ( event => {
			store.dispatch(editEntityOption({
				id,
				[event.target.name]: event.target.value
			}));
		});

		const update_expense_group_edit = id => event => {
			store.dispatch(updateEntity({
				id,
				[event.target.name]: event.target.value
			}));
		};

		const close_expense_group_options_dialog_action = id => () => store.dispatch(closeExpenseGroupOptionsDialog({ id }));
		const handle_app_options_dialog_close = () => store.dispatch(closeAppOptionsDialog());

		const application_total_cost = obtainChildCostTotal(
			expense_group_children,
			expense_group_child_by_id,
			application_options
		);

		const application_metrics = [
			{
				label: "Groups",
				value: expense_groups.length ,
			},
			{
				label: "Expenses",
				value: expense_group_children.length ,
			},
			{
				label: "Total Cost",
				value: `$${application_total_cost.costFormat()}/${application_options.costUOM}`
			}
		];

		/**
		 * Expense Group Specific Items
		 */
		const expense_groups_with_add_button = Object.keys(expense_group_by_id).map( ( group_id, group_index )  => {
			const group_data = expense_group_by_id[group_id];
			const group_options = expense_group_options[group_id];
			const { edit, ...group_edit_data } = group_data;
			const group_children = obtainExpenseGroupChildren(group_id, expense_group_child_by_id);
			const num_group_children = group_children.length;
			const group_children_total_cost = obtainChildCostTotal(
				group_children.map( child => child.id ),
				expense_group_child_by_id,
				expense_group_options[group_id]
			);

			const is_child_in_edit = reduceToBooleanByBoolean(group_children, "edit");

			const { title, description } = group_data;
			// Main functionality Buttons
			const primary_buttons = [
				<Add_Expense_Button key={"add-expense-button"} action={() => store.dispatch(addExpenseGroupChild({ parentID: group_id }))} />,
				<Edit_Expense_Group_Button key={"edit-expense-group-button"} action={() => store.dispatch(editEntity({ id : group_id, title, description }))} />
			];

			// Delete and Expense Group Options Button
			const administrative_buttons = [
				<Open_Expense_Group_Options_Dialog_Button key={"open-expense-group-options-dialog-button"} action={() => store.dispatch(openExpenseGroupOptionsDialog({ id : group_id}))}/>,
				<Remove_Expense_Group_Button key={"remove-expense-group-button"} action={() => store.dispatch(removeExpenseGroup({ id: group_id}))}/>
			];

			// Buttons seen when editing the group
			const edit_view_buttons = [
				<Save_Expense_Group_Edit_Button action={() => store.dispatch(saveEntity({id: group_id}))} />,
				<Cancel_Expense_Group_Edit_Button action={() => store.dispatch(cancelEditEntity({id: group_id}))} />
			];



			const rendered_group_children = group_children.map((child_obj, index) => {
				const { id, edit } = child_obj;

				// Action dispatched when we edit an expense group child
				const edit_expense_group_child = () => ( edit ) ?
					null
					:
					store.dispatch(editEntity({ id }));

				// Action dispatched when we update an expense group child
				const child_update_handler = event =>
					( expense_group_child_validator( event.target.name, event.target.value ) ) ?
						store.dispatch(
							updateEntity({
								id,
								[event.target.name] : event.target.value
							})
						)
						:
						null;

				const child_save_handler = () => store.dispatch(saveEntity({id}));

				// Action dispatched when we delete an expense group child
				// Notice the stopPropagation there. Yeah that's there for a reason.
				const delete_expense_group_child = event => {
					event.stopPropagation();
					return store.dispatch(removeExpenseGroupChild({ id, parentID: group_id }));
				};

				return (
					<Expense_Group_Child
						key={`expense-group-${id}-child-${index}`}
						child_data={child_obj}
						edit_data={expense_group_entity_edit}
						child_update_handler={child_update_handler}
						child_remove_handler={delete_expense_group_child}
						child_save_handler={child_save_handler}
						edit_context_handler={edit_expense_group_child}
					/>
				);
			});

			// oh boy
			const table_headers = [
				"Title",
				"Cost",
				"UOM",
				(is_child_in_edit) ? "" : "Delete",
			];

			return (
				<Expense_Group
					id={group_id}
					buttons_primary={primary_buttons}
					buttons_admin={administrative_buttons}
					buttons_editing={edit_view_buttons}
					description={group_data.description}
					editing_view={<Expense_Group_Edit_Form
						buttons={edit_view_buttons}
						update_handler={update_expense_group_edit(group_id)}
						{...{ id : group_id, ...group_edit_data }}
					/>}
					is_editing={group_data.edit}
					key={`expense-group-${group_id}`}
					num_children={num_group_children}
					title={group_data.title}
				>{ num_group_children ?
						<Expense_Group_Table
							children_total_cost={group_children_total_cost}
							headers={table_headers}
							isChildInEdit={is_child_in_edit}
							groupTotalUOM={group_options.costUOM}
						>{rendered_group_children}</Expense_Group_Table>
						:
						<Typography style={{marginTop : "5px"}}>Add an expense below</Typography>}
				</Expense_Group>
			);
		}
		).concat(<Add_Expense_Group_UI_Button key={"expense-group-add-button"} action={() => store.dispatch(addExpenseGroup())}/>);

		return (
			<div>
				<Top_App_Bar metrics={application_metrics}/>
				<Groups_Window>{expense_groups_with_add_button}</Groups_Window>
				<Main_Menu
					onMenuClose={() => store.dispatch(closeMainMenu())}
					isMenuOpen={user_interface.main_menu_open}
					metrics={application_metrics}
				/>
				<Options_Dialog
					onChange={update_application_options}
					onClose={handle_app_options_dialog_close}
					open={dialog_open}
					options_values={optionsValues}
					options_values_labels={readOnlyApplicationData["application_options_labels"]}
					options_values_list={readOnlyApplicationData["application_options"]}
					title="Application"
				/>
				<Expense_Group_Options_Dialog
					groups={expense_group_by_id}
					options={expense_group_options}
					readOnlyGroupData={readOnlyGroupData}
					update_options_action={update_expense_group_options}
					dialog_close_action={close_expense_group_options_dialog_action}
				/>
			</div>
		);
	}
}

App.propTypes = {
	store: PropTypes.object.isRequired,
};

/**
 * Looking to get rid of this unless it's ABSOLUTELY necessary.
 * This app really isn't big enough to be needing to pass context down
 * nearly as much as I have.
 */
App.childContextTypes = {
	store : PropTypes.object.isRequired,
};

export { App };