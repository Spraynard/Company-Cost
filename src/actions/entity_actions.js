
import C from "../constants";

export const editEntity = (input_object) => ({
    ...input_object,
    type: C.EDIT_ENTITY
});

export const updateEntity = (input_object) => ({
    ...input_object,
    type: C.UPDATE_ENTITY
});

// Saves the edited values of that entity to that entity's main data
export const saveEntity = ({ id }) => ({
    type: C.SAVE_ENTITY,
    id
});

export const cancelEditEntity = ({ id }) => ({
    type: C.CANCEL_EDIT_ENTITY,
    id
});

export const editEntityOption = (input_object) => ({
    ...input_object,
    type: C.EDIT_ENTITY_OPTION
});