// --------------- TYPES ---------------
import { GetCharacters } from '../Types';
import { Constants } from '../../CommonConfig';
import { Tools } from '../../Helpers';

// --------------- INITIAL STATE ---------------
export const INITIAL_STATE = {
};

// --------------- REDUCER FUNCTION ---------------
export default (state = INITIAL_STATE, action) => {
    // console.log(action, action['payload'].entries, "action")
    switch (action.type) {
        // Register
        case GetCharacters.REQUEST:
            return { ...state, getCharacterSuccess: null, error: null, errorMsg: '', successMsg: '', };
        case GetCharacters.SUCCESS:
            return { ...state, getCharacterSuccess: true, successMsg: action.payload.message, characterListResponse: action && action['payload'] };
        case GetCharacters.FAILED:
            return { ...state, getCharacterSuccess: false, error: action.payload, errorMsg: Tools.trimString(action.payload.message), characterListResponse: action && action['payload'] };
        default:
            return state;
    }
};
