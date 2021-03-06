// Custom Helpers
import { capitalizeFirstLetter } from "../../helpers/helpers";

// Material UI Components
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

// Material UI Styles
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	root : {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	}
});

const Options_Dialog = ( props ) => {

	const {
		open,
		title,
		options_values,
		options_values_list,
		options_values_labels,
		classes,
		labelType,
		onClose,
		onChange
	} = props;

	const options_items = ( options_values ) ? Object.keys(options_values).map((options_value, index) => {
		let field_label = (typeof labelType === "undefined") ?
			options_values_labels[options_value] :
			options_values_labels[labelType][options_value];

		return (
			<Grid key={index} item>
				<TextField
					select
					onChange={onChange}
					label={field_label}
					name={options_value}
					value={options_values[options_value]}
					fullWidth={true}
					margin="normal"
				>
					{options_values_list[options_value].map((item, index) => {
						let item_text = capitalizeFirstLetter(item);
						return (
							<MenuItem key={index} value={item}>
								{item_text}
							</MenuItem>
						);
					})}
				</TextField>
			</Grid>
		);
	})
		:
		[];

	return (
		<Dialog open={open} onClose={onClose} aria-labelledby="entity-options-dialog-title">
			<DialogTitle id="entity-options-dialog-title">{`${title} Options`}</DialogTitle>
			<form
				className={classes.root}
			>
				<Grid container
					direction="column"
					spacing={4}
				>
					{options_items}
				</Grid>
			</form>
		</Dialog>
	);
};

export default withStyles(styles)(Options_Dialog);