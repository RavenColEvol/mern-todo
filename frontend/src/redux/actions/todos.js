import { GET_TODOS, DELETE_TODO, ADD_TODO } from './types'
import axios from 'axios'
import {createNotification} from './notification'

export const getTodos = () => dispatch => {
    axios.get('http://localhost:5000')
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
    axios.post('http://localhost:5000/todos/delete-todo', { 'id': id })
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

    axios.post('http://localhost:5000/todos/add-todo', todo)
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