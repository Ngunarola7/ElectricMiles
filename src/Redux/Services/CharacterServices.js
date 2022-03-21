import { Constants } from '../../CommonConfig';
import { Tools } from '../../Helpers';
import Ajax from './base';

const BASE_URL = 'https://breakingbadapi.com/api/characters';

    export default {
        GetCharacters: () => {
            if (global.isConnected) {
                return fetch(BASE_URL, {
                    method: 'GET',
                })
                    .then((response) => Ajax.handleResponse(response))
                    .then((data) => data);
            } else {
                return Promise.reject({ message: Constants.NO_INTERNET_MESSAGE });
            }
        },
    }