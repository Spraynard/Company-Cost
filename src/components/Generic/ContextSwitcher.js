/**
 * Display component that switches between two different displays based on given context
 *
 * @param {array} children - DOM Children of the component
 * @param {any} component - The Tag of the component. Defaults to div
 * @param {bool} switchContext - A boolean that, if true, tells us that our context is switched, so we display the switchedView
 * @param {Component} switchedView - Component displayed when our context is switched.
 */
const ContextSwitcher = ({ children, component, switchContext, switchedView, ...other }) => {
	const TagName = component || "div";

	return <TagName {...other}>{ ( switchContext ) ? switchedView : children }</TagName>;
};

export default ContextSwitcher;