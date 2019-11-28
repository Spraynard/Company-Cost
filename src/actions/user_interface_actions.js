import C from "../constants";

export const openMainMenu = () => ({
	main_menu_open: true,
	type: C.UPDATE_USER_INTERFACE_STATE
});

export const closeMainMenu = () => ({
	main_menu_open: false,
	type: C.UPDATE_USER_INTERFACE_STATE
});