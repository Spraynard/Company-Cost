import Stats_Window from "./Stats_Window"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles( theme => ({
    direction: {
        display: "flex"
    },
    // Flex vert with padding on the element.
    justification: {
        "flexDirection": "column",
        "textAlign": "center",
        "padding": theme.spacing(1) / 2,
        "& + &": {
            marginLeft: theme.spacing(2)
        }
    },
}));

const Horizontal_Stats_Window = ( props ) => {
    const classes = useStyles();
    console.log("These are the classes");
    console.log(classes);
    return (
        <Stats_Window
            layoutClasses={classes}
            {...props}
        />
    )
}
export default Horizontal_Stats_Window;