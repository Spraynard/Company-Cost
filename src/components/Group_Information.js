
// MaterialUI
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	'grow' : {
		flexGrow : 1
	},
	'flex' : {
		'display' : 'flex'
	},
	'highlight' : {
		'background' : theme.palette.primary.main,
		'color' : theme.palette.primary.contrastText,
		'textDecoration' : 'underline',
		'padding' : '2px 5px',
		'borderRadius' : '5%',

	}
})

const Group_Information_Unstyled = ({ header, text, classes }) => (
	<Grid item xs={12} sm={6} className={`${classes.flex} group-info-wrapper`}>
		<Grid item>
			<Typography component="span" variant="body2" className={`${classes.highlight} group-info-header`}>
			{header}
			</Typography>
		</Grid>
		<Grid item>
			<Typography component="span" className="group-info-text">
			{text}
			</Typography>
		</Grid>
	</Grid>
);

export const Group_Information = withStyles(styles)(Group_Information_Unstyled);