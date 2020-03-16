import {CREATE_NOTIFICATION} from '../actions/types'

const initialState = {
    type: '',
    message: ''
}


export default function(state = initialState, action) {
    switch(action.type) {
        case CREATE_NOTIFICATION:
            return action.payload
        default:
            return state;
    }
}