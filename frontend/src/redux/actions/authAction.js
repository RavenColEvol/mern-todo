import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {createNotification} from './notification'

import {
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";


export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(res => {
            dispatch(createNotification({type:'success', message:'Welcome to Todo.'}));
            history.push("/");
        })
        .catch(err =>{
            for(var key in err.response.data) {
                dispatch(createNotification({type:'error', message:err.response.data[key]}))
            }
        });
};


export const loginUser = userData => dispatch => {
    axios
        .post("/api/users/login", userData)
        .then(res => {

            const { token } = res.data;
            localStorage.setItem("jwtToken", token);

            setAuthToken(token);
            
            const decoded = jwt_decode(token);
            
            dispatch(setCurrentUser(decoded));
            dispatch(createNotification({type:'success', message:'Login Success'}));
        })
        .catch(err =>{
            if(err.response)
            for(var key in err.response.data) {
                dispatch(createNotification({type:'error', message:err.response.data[key]}))
            }
            else
                dispatch(createNotification({type:'error', message:"Can't Login."}))
        });
};


// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};


// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};


// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    dispatch(createNotification({type:'success', message:'Thanks for visiting.'}));
};