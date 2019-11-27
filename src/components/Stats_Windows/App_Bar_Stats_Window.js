// Material UI Imports
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";

// Custom Component Imports
import { Clickable } from "../Clickable";
import Stats_Window from "./Stats_Window";
import { Box } from "@material-ui/core";

const styles = theme => ({
	root: {
		background: "#185a9d",//theme.palette.gradients.secondRiver,//'linear-gradient(to right, #9d50bb, #6e48aa)',//theme.palette.primary.light,
		borderRadius: theme.shape.borderRadius,
		color: theme.palette.common.white,
		cursor: "context-menu",
		display: "flex",
		margin: theme.spacing(1),
		padding: theme.spacing(1),
		transition: theme.transitions.create(["background"]),
		"&:hover": {
			background: emphasize("#185a9d", .30)
		}
	},
	itemContainer : {
		display: "flex",
		flexDirection: "column",
		textAlign: "center",
		padding: theme.spacing(1) / 2,
		"& + &": {
			marginLeft: theme.spacing(2)
		}
	}
});

const App_Bar_Stats_Window = withStyles(styles)(({ onClick, display, ...props }) =>
	<Box display={display}>
		<Clickable onClick={onClick}>
			<Stats_Window {...props} />
		</Clickable>
	</Box>
);

export default App_Bar_Stats_Window;