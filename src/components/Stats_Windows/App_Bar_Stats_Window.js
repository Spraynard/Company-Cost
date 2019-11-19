// Material UI Imports
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles"

// Custom Component Imports
import { Clickable } from "../Clickable";
import Stats_Window from "./Stats_Window"
import Stats_Window_Item from "./Stats_Window_Item";
import { Box } from "@material-ui/core";

const styles = theme => ({
    root: {
        display: "flex",
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        background: theme.palette.primary.light,
        cursor: "context-menu",
        transition: theme.transitions.create(["background"]),
        "&:hover": {
            background: emphasize(theme.palette.primary.light, .30)
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

const App_Bar_Stats_Window = withStyles(styles)(({ onClick, ...props }) =>
    <Box display={{ xs: 'none', 'md' : 'block' }}>
        <Clickable onClick={onClick}>
            <Stats_Window {...props} />
        </Clickable>
    </Box>
)

export default App_Bar_Stats_Window;