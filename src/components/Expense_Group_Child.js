import { PropTypes } from "prop-types";
import {
	editEntity,
	removeExpenseGroupChild,
	updateEntity,
} from "../actions";

import Entity_Manipulation_Button from "./Entity_Manipulation_Button";
import Entity_Edit_Field from "./Entity_Edit_Field";


// Material UI
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
	root : {
		marginBottom : theme.spacing.unit * 2,
		'& + &:not(:nth-child(odd))' : {
			marginLeft : theme.spacing.unit
		}
	},
	chip: {
		backgroundColor: theme.palette.secondary.light,
		'&:hover' : {
			color : theme.palette.primary.contrastText,
			backgroundColor: theme.palette.secondary.dark // or theme.palette.primary.main
		}
	},
});

const Expense_Group_Child = (props, { store }) => {

	let { timestamp, parentID, edit, classes, ...editValues } = props;

	// const { classes, ...fullProps } = props;

	const updateExpenseGroupChildEdit = ( event ) => {

		if ( event.target.name === 'cost' )
		{
			function countDecimals( number ) {
				if ( Math.floor( number ) === number ) return 0;
				return ( number.toString().split('.').length > 1 ) ? number.toString().split('.')[1].length : 0;
			}

			if ( countDecimals( event.target.value ) > 2 )
			{
				alert("You may only have a maximum of two numbers after the decimal");
				return;
			}
		}

		store.dispatch(updateEntity({
			id : props.id,
			[event.target.name] : event.target.value
		}));
	};

	// title - cost /costUOM
	const expense_group_chip_label = `${props.title} ${ props.cost ? `- $${props.cost}` : '' } ${ props.costUOM ? `/${props.costUOM}` : ''}`

	return (
		<div className={`expense-group-child ${classes.root}`}>
		{ props.edit ?
			<Entity_Edit_Field
				{...editValues}
				timestamp={timestamp}
				updateListener={updateExpenseGroupChildEdit}
			/>
			:
			<Chip
				className={classes.chip}
				color='secondary'
				label={expense_group_chip_label}
				onClick={() => store.dispatch(editEntity({...editValues}))}
				onDelete={() => store.dispatch(removeExpenseGroupChild({
					id : props.id,
					parentID : parentID
				}))}
			/>}
		</div>
	);
};


Expense_Group_Child.defaultProps = {
	title : "Expense Group Child"
};

Expense_Group_Child.contextTypes = {
	store : PropTypes.object.isRequired
};

export default withStyles(styles)(Expense_Group_Child);