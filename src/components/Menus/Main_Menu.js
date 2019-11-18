import PropTypes from "prop-types";

// Domain Component Import
import Horizontal_Stats_Window from "../Stats_Windows/Horizontal_Stats_Window";

// Material-UI Imports
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";

const Main_Menu = ( props, { store }) => {
    const {
        isMenuOpen,
        onMenuClose,
        openOptionsDialog,
        appStats
    } = props;

    const {
        costUOM,
        totalGroups,
        totalExpenses,
        totalCost
    } = appStats;

    return (
        <Drawer open={isMenuOpen} onClose={onMenuClose} anchor='right'>
            <Typography variant="h5" gutterBottom>Application Statistics</Typography>
            <Horizontal_Stats_Window
                applicationCostUnitOfMeasurement={costUOM}
                expenseGroups={totalGroups}
                expenses={totalExpenses}
                onClick={openOptionsDialog}
                totalCost={totalCost}
            />
        </Drawer>
    )
}

Main_Menu.contextTypes = {
    store: PropTypes.object.isRequired
}

export default Main_Menu