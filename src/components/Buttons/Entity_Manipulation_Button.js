import PropTypes from "prop-types";

// Material UI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
	root : {
		"& + &" : {
			marginLeft: theme.spacing(1)
		}
	}
});

const buttonDefaults = {
	color: "primary",
	variant : "contained",
};

/**
 * This button is meant to handle every kind of entity manipulation you can do to an expense group or an expense group child
 */
const Entity_Manipulation_Button = ( props, { store } ) => {

	const { classes, action, ...incomingButtonProps } = props;

	let buttonProps = {
		...buttonDefaults,
		...incomingButtonProps // Will override the defaults if applicable
	};

	return (
		<Button
			{...buttonProps}
			className={classes.root}
			onClick={() => store.dispatch(action)}
		>
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
	action : PropTypes.object.isRequired
};

// Context
Entity_Manipulation_Button.contextTypes = {
	store : PropTypes.object.isRequired
};

export default withStyles(styles)(Entity_Manipulation_Button);