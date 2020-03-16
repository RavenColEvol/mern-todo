import {combineReducers} from 'redux'

import todos from './todos'
import auth from './authReducer'
import notification from './notificationReducer'

export default combineReducers({todos, auth, notification})