import { Component } from "react";
import { PropTypes } from "prop-types";

import * as readOnlyApplicationData from "../../data/read_only_application_data";

import Top_App_Bar from "./Top_App_Bar";
import Groups_Window from "./Groups_Window";
import Options_Dialog from "./Options_Dialog";
import Main_Menu from "./Menus/Main_Menu";

// Redux Actions
import {
	resetAppData,
	editApplicationOption,
	openAppOptionsDialog,
	closeAppOptionsDialog,
} from "../actions/application_actions";
import { closeMainMenu } from "../actions/user_interface_actions"
import { saveEntity, cancelEditEntity } from "../actions/entity_actions";
import { addExpenseGroup } from "../actions/expense_group_actions";

// Helper Functions
import { obtainChildCostTotal } from "../helpers/helpers";

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
			expense_group_children,
			expense_group_child_by_id
		} = store.getState();
		const { dialog_open, ...optionsValues } = application_options;
		const updateApplicationOptions = (event) => {
			store.dispatch(editApplicationOption({
				[event.target.name]: event.target.value
			}));
		};
		const handleClose = () => store.dispatch(closeAppOptionsDialog());
		const appWindowStatistics = {
			costUOM: application_options.costUOM,
			totalGroups: expense_groups.length,
			totalExpenses: expense_group_children.length,
			totalCost: obtainChildCostTotal(
				expense_group_children,
				expense_group_child_by_id,
				application_options
			)
		}

		return (
			<div className="business-calculator">
				<Top_App_Bar />
				<Groups_Window />
				<Main_Menu
					onMenuClose={() => store.dispatch(closeMainMenu())}
					isMenuOpen={user_interface.main_menu_open}
					openOptionsDialog={() => store.dispatch(openAppOptionsDialog())}
					appStats={appWindowStatistics}
				/>
				<Options_Dialog
					open={dialog_open}
					title="Application"
					options_values={optionsValues}
					onClose={handleClose}
					onChange={updateApplicationOptions}
					options_values_labels={readOnlyApplicationData["application_options_labels"]}
					options_values_list={readOnlyApplicationData["application_options"]}
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