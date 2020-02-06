import {DEFINE_API_TOKEN} from "../actionType";

const initialState = {
    apiToken: "",
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DEFINE_API_TOKEN : {
            return {
                ...state,
                apiToken: action.apiToken
            }
        }
        default: return state

    }
}