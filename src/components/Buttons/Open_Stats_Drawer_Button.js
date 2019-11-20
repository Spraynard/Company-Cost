
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Menu from "@material-ui/icons/Menu";

const Open_Stats_Drawer_Button = ({ onClick, ...other }) =>
    <Box { ...other }>
        <Button onClick={onClick}>
            <Menu htmlColor='white'/>
        </Button>
    </Box>

export default Open_Stats_Drawer_Button;
