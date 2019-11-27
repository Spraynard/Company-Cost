// Prop Type Checks on Render
import { PropTypes } from "prop-types";

// Actions
import { openAppOptionsDialog } from "../actions/application_actions";
import { openMainMenu } from "../actions/user_interface_actions";

// UI Components
import App_Bar_Stats_Window from "./Stats_Windows/App_Bar_Stats_Window";
import Open_Stats_Drawer_Button from "./Buttons/Open_Stats_Drawer_Button";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

// Material UI Styles Import
import { withStyles } from "@material-ui/core/styles";

// Component Styles
const styles = theme => ({
	root : {
		background : theme.palette.gradients.secondRiver
	},
	appButtonMargin : {
		marginLeft : theme.spacing(1)
	},
	flexEnd : {
		alignSelf : "flex-end"
	},
	marginLeft : {
		"marginLeft" : "auto"
	},
	buttonIconStyles : {
		"marginRight" : "5px"
	},
	headerTextStyles : {
		"color" : theme.palette.primary.contrastText
	},
	siteTitle : {
		fontFamily : theme.typography.siteTitle.fontFamily,
		flexGrow: 1,
		color : theme.palette.secondary.contrastText
	}
});

const Top_App_Bar = ( props, { store } ) => {

	const { classes, ...other } = props;

	return (
		<AppBar position="sticky" className={classes.root}>
			<Toolbar>
				<Typography className={classes.siteTitle} component="span" variant="h3">Company Cost</Typography>
				<Open_Stats_Drawer_Button
					display={{ xs : "block", "md" : "none" }}
					onClick={() => store.dispatch(openMainMenu())}
				/>
				<App_Bar_Stats_Window
					onClick={() => store.dispatch(openAppOptionsDialog())}
					display={{ xs: "none", "md": "block" }}
					{ ...other }
				/>
			</Toolbar>
		</AppBar>
	);
};

Top_App_Bar.contextTypes = {
	store : PropTypes.object.isRequired
};

export default withStyles(styles)(Top_App_Bar);