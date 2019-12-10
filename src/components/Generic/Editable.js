import ContextSwitcher from "./ContextSwitcher";
/**
 * Generic display component that provides an abstraction over our ContextSwitcher.
 *
 * The context here is based on whether or not our editable component is being edited.
 *
 * @param {bool} isEdit - Boolean as to whether this component is being edited.
 * @param {Component} editView - The view shown when being edited.
 */
const Editable = ({ isEdit, editView, ...props }) =>
	<ContextSwitcher switchContext={isEdit} switchedView={editView} {...props}/>;

export default Editable;