import ContextSwitcher from "./ContextSwitcher";
/**
 * Editable is a generic component that is basically a "context switcher",
 * but here the context switches on whether or not we are "in edit" or not.
 */
const Editable = ({ isEdit, editView, ...props }) =>
	<ContextSwitcher switchContext={isEdit} switchedView={editView} {...props}/>;

export default Editable;