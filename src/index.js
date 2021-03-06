import React from "react";
import { render } from "react-dom";
import { store } from "./store";
import { App } from "./components/App";
import "./utils";

// Material UI
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { CompanyCostTheme } from "./theme";

const storeData = ( process.env.NODE_ENV === "development" ) ?
	store( require("../data/test_state.json") ) : store();

window.store = storeData;
window.React = React;

render(
	<MuiThemeProvider theme={CompanyCostTheme}>
		<CssBaseline />
		<App store={storeData} />
	</MuiThemeProvider>, document.getElementById("app-mount")
);
