import { GET_TODOS, DELETE_TODO, ADD_TODO, IS_UPDATING, UPDATE_TODO, IS_ADDING , FETCHING_TODO} from './types'
import axios from 'axios'
import {createNotification} from './notification'

export const getTodos = () => dispatch => {
    dispatch({
        type: FETCHING_TODO
    })
    axios.get('/api')
        .then(res => {
            dispatch({
                type: GET_TODOS,
                payload: res.data['todos']
            })
            dispatch(createNotification({type:'success', message:'Todos Updated'}));
        })
        .catch(err => {
            for(var key in err.response.data) {
                dispatch(createNotification({type:'error', message:err.response.data[key]}))
            }
        })
}

export const deleteTodo = (id) => dispatch => {
    axios.post('/api/todos/delete-todo', { 'id': id })
        .then(res => {
            dispatch({
                type: DELETE_TODO,
                payload: id
            })
            dispatch(createNotification({type:'success', message:'Todo deleted'}));
        })
        .catch(err => {
            for(var key in err.response.data) {
                dispatch(createNotification({type:'error', message:err.response.data[key]}))
            }
        })
}

export const addTodo = (todo) => dispatch => {

    axios.post('/api/todos/add-todo', todo)
        .then(res => {
            dispatch({
                type: ADD_TODO,
                payload: res['data']['todo']
            })
            dispatch(createNotification({type:'success', message:'New Todo added'}));
        })
        .catch(err => {
            for(var key in err.response.data) {
                dispatch(createNotification({type:'error', message:err.response.data[key]}))
            }
        })
}


export const toggleUpdate = (todo) => dispatch => {
    dispatch({
        type:IS_UPDATING,
        payload: todo
    })
}

export const isAdding = () => dispatch => {
    dispatch({
        type:IS_ADDING,
    })
}

export const updateTodo = (todo) => dispatch => {

    axios.post('/api/todos/update-todo', todo)
        .then(res => {
            dispatch({
                type: UPDATE_TODO,
                payload: todo
            })
            dispatch({type:IS_ADDING})
            dispatch(createNotification({type:'success', message:'Todo Updated'}));
        })
        .catch(err => {
            for(var key in err.response.data) {
                dispatch(createNotification({type:'error', message:err.response.data[key]}))
            }
        })
}