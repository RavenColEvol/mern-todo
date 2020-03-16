import {CREATE_NOTIFICATION} from './types'

export const createNotification = message => {
    return {
        type: CREATE_NOTIFICATION,
        payload: message
    }
}