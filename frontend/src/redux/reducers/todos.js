import {GET_TODOS, DELETE_TODO, ADD_TODO, IS_UPDATING, UPDATE_TODO, IS_ADDING} from '../actions/types'

const initialState = {
    todos:[],
    isUpdating: false,
    todo:{
        title:'',
        description: ''
    }
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
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(e => e._id === action.payload._id ? action.payload : e)
            }
        case DELETE_TODO:
            return {
                ...state,
                todos : state.todos.filter(e => e._id !== action.payload)
            }
        case IS_UPDATING:
            return {
                ...state,
                isUpdating: true,
                todo: action.payload
            }
        case IS_ADDING:
            return {
                ...state,
                isUpdating: false,
                todo: {
                    title:'',
                    description:''
                }
            }
        default :
            return state;
    }
}