import { CREATE_POST, DRAFT_POST, POST_LIST, GET_SINGLE_POST, UPDATE_POST,NEXT_POST } from "../action/types";

const   initialState = {
    post: [],
    title: null,
    content: null,
    tag: null,
    status: null,
    author_id: null
}

// post reducer cases
export default function (state= initialState, action){

    switch(action.type){
        case POST_LIST:
            return{
                ...state,
                ...action.payload,
                post: action.payload
            }
        case CREATE_POST:
            return{
                ...state,
                ...action.payload,  
            }
        case DRAFT_POST:
            return{
                ...state ,
                ...action.payload
            }
        case GET_SINGLE_POST:
            return{
                ...state,
                ...action.payload
            }
        case UPDATE_POST:
            return{
                ...state,
                ...action.payload,
                post:[...action.payload]
            }
        default:
            return state;
    }
}