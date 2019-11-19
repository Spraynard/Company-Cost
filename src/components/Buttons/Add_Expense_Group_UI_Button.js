import Typography from "@material-ui/core/Typography";
import AddCircle from "@material-ui/icons/AddCircle";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root : {
        background: 'linear-gradient(to right, #b3ffab, #12fff7)',//'linear-gradient(131deg, rgba(231,255,231,1) 0%, rgba(76,255,105,1) 100%)',
        border: `1px solid #6dade6`,
        boxShadow: '0px 3px 5px -1px rgba(64,165,255,.50),0px 6px 10px 0px rgba(64,165,255,.50),0px 1px 18px 0px rgba(64,165,255,.50)',
        height : '100%',
        height : '250px',
        padding : theme.spacing(2),
        width : '100%',
        transition : theme.transitions.create(['box-shadow']),
        '&:hover' : {
            boxShadow: '0px 3px 5px -1px rgba(254, 118, 118,.50),0px 6px 10px 0px rgba(254, 118, 118,.50),0px 1px 18px 0px rgba(254, 118, 118,.50)',
        }
    },
    ghostlyOutline : {
        alignItems: 'center',
        border: `5px solid #6dade6`,
        borderRadius: '10px',
        color: '#6dade6',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        transition: theme.transitions.create(['color', 'border']),
        width: '100%',
        '&:hover' : {
            color: theme.palette.common.white,
            border: `5px solid #fe7676`,
        }
    },
    icon : {
        fontSize: theme.typography.fontSize * 4 + 'px',
    }
});

const Add_Expense_Group_UI_Button = withStyles(styles)(({ classes, action, ...props }) =>
    <Paper className={classes.root} component="button" elevation={6} onClick={action}>
        <div className={classes.ghostlyOutline}>
            <Typography variant="h5">{"Add Expense Group".toUpperCase()}</Typography>
            <AddCircle className={classes.icon}/>
        </div>
    </Paper>
)

export default Add_Expense_Group_UI_Button;