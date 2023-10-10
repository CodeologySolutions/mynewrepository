import axios from '../../webServices/axios-api';
 
import WebFields from '../../webServices/webFields.json';
 
import { AppConstants } from '../../appUtils/appConstants';

// =======================

{ /* Request - Search Users List */ }
export const templeList = (viewModel) => {
    debugger
    console.log("viewModel==>",viewModel);
    return {
        type: TEMPLE_LIST,
        model: viewModel
    };
};

{ /* Request Failure - Search Users List */ }
export const templeListFailed = (viewModel) => {
    return {
        type: TEMPLE_LIST_FAILED,
        model: viewModel
    };
};

{ /* Request - Game Types */ }
export const requestTempleList = (payload) => {

    // addLog("searchUserList payload :::> ", payload);

    return (dispatch) => {
       // axios.defaults.headers.post[WebFields.HEADERS.ACCESS_TOKEN] = global.token;
        axios
            .post(WebFields.TEMPLE_LIST.MODE, {limit:2})
            .then((response) => {
                //       addLog("searchUserList:::> ", response.data);
                // addLog("URL:::> ", response.config.baseURL + response.config.url);
                console.log("Request:::> ", response.config.data);
                // addLog("Response:::> ", response.data);
                debugger
                console.log("Response:::> ", response.data)
                dispatch(templeList(response.data));

            })
            .catch((error) => {
                // addLog("Error:::> ", error.response.data);
                dispatch(templeListFailed(error.response.data));
            })
            .finally(() => {
                // $('#overlay').hide();
            });
    };
};

export const resetTempleListState = () => {
    return {
        type: RESET_TEMPLE_LIST_STATE,
    };
};

export const TEMPLE_LIST = 'TEMPLE_LIST';
export const TEMPLE_LIST_FAILED = 'TEMPLE_LIST_FAILED';
export const RESET_TEMPLE_LIST_STATE = 'RESET_TEMPLE_LIST_STATE';