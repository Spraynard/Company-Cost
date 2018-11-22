import { createMuiTheme } from '@material-ui/core/styles';

export const myTheme = createMuiTheme({
	typography : {
		useNextVariants : true
	},
	palette: {
		// primary: {
		// 	light : '#FCFDE7',
		// 	dark : '#C5C88D',
		// 	main : '#17783E',
		// 	saturate : '#17783E',
		// 	contrastText: '#000'
		// },
		// secondary: {
		// 	light : '#B9AEBD',
		// 	dark : '#7C6186',
		// 	main : '#96839E',
		// 	saturate : '#703787',
		// 	contrastText: '#fff'
		// }
		primary: {
			light: '#757ce8',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000',
		},
	},
});

// green main: #E9EBC1
// green dark: #C5C88D
// green light: #FCFDE7
// green saturate: #17783E
// text color: #4D4E48
//
// purple main: #96839E
// purple light: #B9AEBD
// purple dark: #7C6186
// purple saturate: #703787
// purple contrastText : '#fff'
//