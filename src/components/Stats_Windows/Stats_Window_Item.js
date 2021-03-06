import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	label: {
		borderBottom: props => "2px solid",
	},
	value: {
		paddingTop: theme.spacing(1)
	}
});

const Stats_Window_Item = React.memo(withStyles(styles)(({ label, value, classes }) =>
	<div>
		<Typography
			variant="body1"
			color="inherit"
			className={classes.label}>{label}</Typography>
		<Typography
			variant="body2"
			color="inherit"
			className={classes.value}>{value}</Typography>
	</div>
), (prevProps, afterProps) => prevProps.value === afterProps.value);

export default Stats_Window_Item;