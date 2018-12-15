//-- Helpers

// React
import { PropTypes } from "prop-types";

// Custom
import {
	obtainSelectProperties,
	capitalizeFirstLetter,
	moneyFormat
} from "../helpers/helpers";

//-- Redux Actions
import {
	editEntity,
	removeExpenseGroupChild,
	updateEntity,
} from "../actions";

//** Components **//

//-- Custom
import Entity_Manipulation_Button from "./Entity_Manipulation_Button";
import Entity_Edit_Field from "./Entity_Edit_Field";

//-- Material UI

// Styles
import { withStyles } from '@material-ui/core/styles';

// Components
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CloseIcon from '@material-ui/icons/Close';

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

	// Transform param allows us to take the input data and perform a functional transform on it.
	const displayChildData = obtainSelectProperties( dataReferenceObject, fullChildData, {
		transform : {
			cost : cost => `$${cost.costFormat()}`,
			costUOM : capitalizeFirstLetter,
		}
	});
	console.log( "Display Child Data", displayChildData );
	return (
		<TableRow>
			{ Object.keys(displayChildData).map(
				( childDataKey, index ) => (<TableCell padding="none" className={ (childDataKey === "title") ? classes.overflowHandler : "" } key={index}>
					{ ( childDataKey === "delete" ) ? <CloseIcon onClick={() => store.dispatch(removeExpenseGroupChild({ id : props.childID, ...fullChildData }))} /> : displayChildData[childDataKey] }
				</TableCell>)
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