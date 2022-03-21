// --------------- TYPES ---------------
import { GetCharacters } from '../Types';

// --------------- ACTIONS ---------------
export const getCharacters = {
    Request: (params) => ({ type: GetCharacters.REQUEST, params }),
    Success: (data) => ({ type: GetCharacters.SUCCESS, payload: data }),
    Failed: (error) => ({ type: GetCharacters.FAILED, payload: error }),
};
