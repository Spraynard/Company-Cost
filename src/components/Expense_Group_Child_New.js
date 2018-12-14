import { PropTypes } from "prop-types";

import {
	editEntity,
	removeExpenseGroupChild,
	updateEntity,
} from "../actions";

import Entity_Manipulation_Button from "./Entity_Manipulation_Button";
import Entity_Edit_Field from "./Entity_Edit_Field";

// Material UI
import { withStyles } from '@material-ui/core/styles';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

// Helpers
import {
	obtainSelectProperties,
	capitalizeFirstLetter,
	moneyFormat
} from "../helpers/helpers";

const styles = theme => ({
	overflowHandler : {
		whiteSpace : 'nowrap',
		overflow : 'hidden',
		textOverflow : 'ellipsis'
	}
});

const Expense_Group_Child_New = ( props, { store } ) => {
	const {
		expense_group_child_by_id
	} = store.getState();

	const { childID, dataReferenceObject, classes, ...rest } = props;

	const fullChildData = expense_group_child_by_id[props.childID];
	const displayChildData = obtainSelectProperties( dataReferenceObject, fullChildData, {
		transform : {
			cost : cost => `$${cost.costFormat()}`,
			costUOM : capitalizeFirstLetter
		}
	});

	return (
		<TableRow>
			{ Object.keys(displayChildData).map(
				( childDataKey, index ) => (<TableCell padding="none" className={ (childDataKey === "title") ? classes.overflowHandler : "" } key={index}>{displayChildData[childDataKey]}</TableCell>)
			)}
		</TableRow>
	)
};


Expense_Group_Child_New.defaultProps = {
	title : "Expense"
};

Expense_Group_Child_New.propTypes = {
	childID : PropTypes.string.isRequired
}

Expense_Group_Child_New.contextTypes = {
	store : PropTypes.object.isRequired
};

export default withStyles(styles)(Expense_Group_Child_New);