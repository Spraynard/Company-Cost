//-- Helpers

import "./styles/expense_group_child_new.css";
// React
import { PropTypes } from "prop-types";

// Custom
import {
	obtainSelectProperties,
	capitalizeFirstLetter,
	// moneyFormat
} from "../helpers/helpers";

import {
	tableDataRef,
	editDataRef
} from "../dataReferenceObjects";

//** Components **//

import Expense_Group_Child_Edit_View from "./Expense_Group_Child_Edit_View";
import {
	editEntity,
	saveEntity,
} from "../actions";

//-- Material UI

// Styles
import { withStyles } from "@material-ui/core/styles";

// Components
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import InputBase from "@material-ui/core/InputBase";

// Icons
import CloseIcon from "@material-ui/icons/Close";

const styles = () => ({
	overflowHandler : {
		whiteSpace : "nowrap",
		overflow : "hidden",
		textOverflow : "ellipsis"
	},
	closeIcon : {
		cursor : "pointer"
	}
});

const Expense_Group_Child_New = ( props, { store } ) => {

	const {
		expense_group_child_by_id,
		expense_group_entity_edit
	} = store.getState();

	const {
		childID,
		classes,
		childClickHandler,
		childDataChangeHandler,
		childRemoveHandler,
	} = props;

	const fullChildData = expense_group_child_by_id[childID];
	const fullChildEditData = expense_group_entity_edit[childID];

	const { edit } = fullChildData;

	// Transform param allows us to take the input data and perform a functional transform on it.
	const displayChildData = obtainSelectProperties( tableDataRef, fullChildData, {
		transform : {
			cost : cost => `$${cost.costFormat()}`,
			costUOM : capitalizeFirstLetter,
		}
	});

	const editableChildData = obtainSelectProperties( editDataRef, fullChildData );

	return (
		<TableRow className="expense-group-child" data-id={childID} onClick={() => childClickHandler( childID, edit )}>
			{ ( edit ) ?
				<Expense_Group_Child_Edit_View
					id={childID}
					childStateData={editableChildData}
					childEditStateData={fullChildEditData}
					childDataChangeHandler={childDataChangeHandler}
				/>
				// // Edit Mode Display
				// Object.keys( editableChildData ).map(
				// 	( childDataKey, index ) => (
				// 		<TableCell
				// 			key={index}
				// 			padding="none"
				// 			colSpan={
				// 				(
				// 					Object.keys(editableChildData).length < 4 &&
				// 					Object.keys(editableChildData).indexOf(childDataKey) === Object.keys(editableChildData).length - 1
				// 				) ? 2 : 1
				// 			}
				// 		>
				// 			<InputBase
				// 				name={childDataKey}
				// 				value={fullChildEditData[childDataKey]}
				// 				onChange={( event ) => childDataChangeHandler( childID, event )}
				// 			/>
				// 		</TableCell>
				// 	)
				// )
				:
				// Default UI Display
				Object.keys(displayChildData).map(
					( childDataKey, index ) => (
						<TableCell padding="none" className={ (childDataKey === "title") ? classes.overflowHandler : "" } key={index}>
							{ ( childDataKey === "delete" ) ?
								<CloseIcon
									onClick={( event ) => childRemoveHandler( childID, fullChildData.parentID, event )}
								/>
								:
								displayChildData[childDataKey]
							}
						</TableCell>
					)
				)
			}
		</TableRow>
	);
};


Expense_Group_Child_New.defaultProps = {
	title : "Expense"
};

Expense_Group_Child_New.propTypes = {
	childID : PropTypes.string.isRequired
};

Expense_Group_Child_New.contextTypes = {
	store : PropTypes.object.isRequired,
};

export default withStyles(styles)(Expense_Group_Child_New);