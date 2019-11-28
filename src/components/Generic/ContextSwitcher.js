const ContextSwitcher = ({ children, component, switchContext, switchedView, ...other }) => {
	const TagName = component || "div";

	return <TagName {...other}>
		{ ( switchContext ) ? switchedView : children }
	</TagName>;
};

export default ContextSwitcher;