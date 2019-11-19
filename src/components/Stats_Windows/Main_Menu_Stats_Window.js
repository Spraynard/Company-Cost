// Material UI Imports
import { withStyles } from "@material-ui/core/styles"

// Custom Component Imports
import Stats_Window from "./Stats_Window"

const styles = theme => ({
    root: {
        padding: theme.spacing(1),
        background: theme.palette.secondary.light,
    },
    box: {
        padding: theme.spacing(1),
    },
    itemContainer: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center"
    },
});

const Main_Menu_Stats_Window = withStyles(styles)( props => <Stats_Window {...props} /> )

export default Main_Menu_Stats_Window;