/**
 * Filename: application_actions.js
 * Description: Includes actions that perform wide reaching changes to the application
 * such as reseting all the data, and editing application level options.
 */

import C from "../constants";

export const resetAppData = () => ({
	type: C.RESET_DATA
});

export const editApplicationOption = (input_object) => ({
	...input_object,
	type: C.EDIT_APPLICATION_OPTION
});

export const openAppOptionsDialog = () => ({
	dialog_open: true,
	type: C.EDIT_APPLICATION_OPTION
});

export const closeAppOptionsDialog = () => ({
	dialog_open: false,
	type: C.EDIT_APPLICATION_OPTION
});