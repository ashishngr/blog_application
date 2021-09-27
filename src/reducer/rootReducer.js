import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';
import commentReducer from './commentReducer';
// root reducer
const rootReducer = combineReducers({ 
    auth: authReducer,
    post: postReducer,
    comment: commentReducer
})

export default rootReducer;