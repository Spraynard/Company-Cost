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
const Entity_Manipulation_Button = ({ classes, action, icon, text, ...other }) => {

	let buttonProps = {
		...buttonDefaults,
		...other // Will override the defaults if applicable
	};

	return (
		<Button
			{...buttonProps}
			className={classes.root}
			onClick={(e) => action()}
		>
			{ icon ? icon
				:
				<Typography type="button" color="inherit">{text}</Typography>
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
};

export default withStyles(styles)(Entity_Manipulation_Button);