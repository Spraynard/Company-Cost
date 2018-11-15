import PropTypes from "prop-types";

// Material UI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
	root : {
		'& + &' : {
			marginLeft: theme.spacing.unit
		}
	}
});

/**
 * This button is meant to handle every kind of entity manipulation you can do to an expense group or an expense group child
 */
const Entity_Manipulation_Button = ( props, { store } ) => {
	let button_classes = "entity-manipulation-button";
	let button_variant = "contained";
	let button_color = "primary";

	const { classes } = props;

	if ( typeof props.type !== "undefined" )
	{
		button_classes += props.type + "-button";
	}

	if ( typeof props.extraClasses !== "undefined" )
	{
		button_classes += ` ${props.extraClasses.join(" ")}`;
	}

	button_classes += ' ' + classes.root;

	if ( typeof props.variant !== "undefined" )
	{
		button_variant = props.variant;
	}

	if ( typeof props.button_color !== "undefined" )
	{
		button_color = props.button_color;
	}

	return (
		<Button color={button_color} variant={button_variant} className={button_classes} onClick={() => store.dispatch(props.dispatchAction)}>
			{ props.icon ? props.icon
				:
				<Typography type="button" color="inherit">{ props.text }</Typography>
			}
		</Button>
	);
};

// Default Values
Entity_Manipulation_Button.defaultProps = {
	text : "Click Me!"
};

// Type Checking
Entity_Manipulation_Button.propTypes = {
	text : PropTypes.string,
	extraClasses : PropTypes.array,
	dispatchAction : PropTypes.object.isRequired
};

// Context
Entity_Manipulation_Button.contextTypes = {
	store : PropTypes.object.isRequired
};

export default withStyles(styles)(Entity_Manipulation_Button);