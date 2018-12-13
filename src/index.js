import React from "react";
import { render } from "react-dom";
import store from "./store";
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { myTheme } from './theme';
import { Business_Calculator } from "./components/Business_Calculator";
import "./utils";

const storeData = ( process.env.NODE_ENV === 'development' ) ?
	store( require('../data/test_state.json') ) : store();

window.store = storeData;
window.React = React;

console.log( storeData.getState() );
render(
	<MuiThemeProvider theme={myTheme}>
		<CssBaseline />
		<Business_Calculator store={storeData} />
	</MuiThemeProvider>, document.getElementById("app-mount")
);
