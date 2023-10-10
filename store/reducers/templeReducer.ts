import produce from 'immer';
 
import * as actionTypes from '../actions/templeAction';

 
const initialState = {
    model: {
        templeListResponse: undefined,
    },
    error: false
};

 
const templeList = (state, action) => {
    debugger
    return produce(state, (draft) => {
        draft.model.templeListResponse = action.model;
        draft.sucess = true;
        draft.error = false;
    });
};

 
const templeListFailed = (state, action) => {
    return produce(state, (draft) => {
        draft.error = true;
        draft.sucess = false;
        draft.errorMessage = action.model.errors;
        draft.model.templeListResponse = action.model;
    });
};

 
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TEMPLE_LIST:
            return templeList(state, action);
        case actionTypes.TEMPLE_LIST_FAILED:
            return templeListFailed(state, action);
        case actionTypes.RESET_TEMPLE_LIST_STATE:
            return resetTempleListState(state);
        default:
            return state;
    }
};

export default (reducer);

const resetTempleListState = (state) => {
    return produce(state, (draft) => {
        draft.error = false;
        draft.sucess = undefined;
        draft.errorMessage = undefined;
        draft.model.templeListResponse = undefined;
    })
}