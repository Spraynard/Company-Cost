import { createMuiTheme } from '@material-ui/core/styles';
import "./fonts/fonts.css";

export const myTheme = createMuiTheme({
	typography : {
		useNextVariants : true,
		siteTitle : {
			fontFamily : 'Banknote'
		}
	},
	palette: {
		primary: {
			light : '#6abf69',
			dark : '#00600f',
			main : '#388e3c',
			contrastText: '#000'
		},
		secondary: {
			light : '#718792',
			dark : '#1c313a',
			main : '#455a64',
			contrastText: '#fff'
		}
	},
});