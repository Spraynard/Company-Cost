import readOnlyGroupData from "../../data/read_only_group_data.json";

// Material UI
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export const Entity_Options_Dialog = ({ open, title, options_values }) => {

	handleSubmit( event ) => {
		console.log( event );
	}

	return (
		<Dialog open={open} aria-labelled-by="entity-options-dialog-title">
			<DialogTitle id="entity-options-dialog-title">{`${title} Options Dialog`}</DialogTitle>
			<form onSubmit={handleSubmit}>
				{ Object.keys( options_values ).map( ( options_value, index ) => {
					return (
						<TextField
							select

					);
				})}
			</form>
		</Dialog>
	)
};