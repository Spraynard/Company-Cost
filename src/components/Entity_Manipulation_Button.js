import PropTypes from "prop-types";

// Material UI
import Button from '@material-ui/core/Button';

/**
 * This button is meant to handle every kind of entity manipulation you can do to an expense group or an expense group child
 */
const Entity_Manipulation_Button = ( props, { store } ) => {
	let button_classes = "entity-manipulation-button";

	if ( typeof props.type !== "undefined" )
	{
		button_classes += props.type + "-button";
	}

	if ( typeof props.extraClasses !== "undefined" )
	{
		button_classes += ` ${props.extraClasses.join(" ")}`;
	}

	return (
		<Button color={'primary'} variant={'contained'}/* className={button_classes} */ onClick={() => store.dispatch(props.dispatchAction)}>
			{ props.text }
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

export default Entity_Manipulation_Button;