/**
 * Component that displays
 */

// Material UI Components
import Box from '@material-ui/core/Box';

const Stats_Window = ( props ) => {
	const {
		classes,
		metrics,
		...other
	} = props;

	const itemList = metrics.map(( item, index ) => <div key={`item-container-${index}`} className={classes.itemContainer}>{item}</div>);

	return ( <Box className={`${classes.root} ${classes.box}`} { ...other }>{itemList}</Box> );
};

export default Stats_Window;
