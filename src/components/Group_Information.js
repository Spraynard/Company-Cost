
// MaterialUI
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root : {
		display : 'flex',
		alignItems : 'center',
	},
	infoText : {
		padding : '2px 5px',
	},
	infoTextBorderRadius : {
		borderTopLeftRadius : theme.shape.borderRadius,
		borderBottomLeftRadius : theme.shape.borderRadius,
	},
	primaryText : {
		background : theme.palette.primary.main,
		color : theme.palette.primary.contrastText,
		textDecoration : 'underline',
	},
	secondaryText : {
		paddingLeft : theme.spacing.unit,
		paddingRight : theme.spacing.unit,
		background : theme.palette.primary.light,
		color : theme.palette.primary.contrastText
	}
})

export const Group_Information = withStyles(styles)(({ header, text, classes }) => (
	<Grid item xs={12} sm={6} className={`${classes.root} group-info-wrapper`}>
		<Grid item className={classes.groupInfoItem}>
			<Typography component="span" variant="body2" className={`${classes.primaryText} ${classes.infoText} ${classes.infoTextBorderRadius} group-info-header`}>
			{header}
			</Typography>
		</Grid>
		<Grid item className={classes.groupInfoItem}>
			<Typography component="span" className={`group-info-text ${classes.secondaryText} ${classes.infoText}`}>
			{text}
			</Typography>
		</Grid>
	</Grid>
));