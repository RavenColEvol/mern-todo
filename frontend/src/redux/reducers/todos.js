import {GET_TODOS, DELETE_TODO, ADD_TODO} from '../actions/types'

const initialState = {
    todos:[]
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_TODOS:
            return {
                ...state,
                todos: action.payload
            }
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case DELETE_TODO:
            return {
                ...state,
                todos : state.todos.filter(e => e._id !== action.payload)
            }
        default :
            return state;
    }
}