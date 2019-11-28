/**
 * Component that displays
 */

// Material UI Components
import Box from "@material-ui/core/Box";
import Stats_Window_Item from "./Stats_Window_Item";

const Stats_Window = ( props ) => {
	const {
		classes,
		metrics,
		...other
	} = props;

	const itemList = metrics.map(( item, index ) =>
		<div key={`item-container-${index}`} className={classes.itemContainer}>
			<Stats_Window_Item label={item.label} value={item.value}/>
		</div>
	);

	return ( <Box className={`${classes.root} ${classes.box}`} { ...other }>{itemList}</Box> );
};

export default Stats_Window;
