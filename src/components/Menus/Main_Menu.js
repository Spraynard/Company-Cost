import PropTypes from "prop-types";

// Domain Component Import
import Main_Menu_Stats_Window from "../Stats_Windows/Main_Menu_Stats_Window";

// Material-UI Imports
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    paper : {
        background: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        padding: theme.spacing(2)
    }
})

const Main_Menu = withStyles(styles)( props => {
    const {
        classes,
        isMenuOpen,
        onMenuClose,
        ...other
    } = props;

    return (
        <Drawer classes={{ paper : classes.paper }} className={classes.root} open={isMenuOpen} onClose={onMenuClose} anchor='right'>
            <Typography variant="h5" gutterBottom>Application Statistics</Typography>
            <Main_Menu_Stats_Window { ...other}/>
        </Drawer>
    )
})

export default Main_Menu