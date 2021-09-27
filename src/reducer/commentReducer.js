import { bindActionCreators } from "redux";
import { CREATE_COMMENT, DELETE_COMMENT,ACTIVE_COMMENT_LIST , GET_ALL_COMMENT, UPDATE_COMMENT, GET_SINGLE_COMMENT } from "../action/types";

const initialState = {
    comment: [],
        content: "",
        author: "",
        status: 1,
        email: "",
        url: "",
        post_id:""

}
// comment reducer cases
export default function (state = initialState, action){
    switch(action.type){
        case CREATE_COMMENT:
            const comment = action.payload
            return{
                ...state,
                ...action.payload,
                comment: action.payload.data,
                content: action.comment.content,
                email: action.comment.email,
                author: action.comment.author,
                url: action.comment.url,
                post_id: action.comment.post_id,
                status: action.comment.status,

            }
            case GET_ALL_COMMENT:
                return{
                    ...state,
                    ...bindActionCreators.payload,
                    comment: action.payload

                }
                case ACTIVE_COMMENT_LIST:
                    return{
                        ...state,
                        ...action.payload,
                        comment: action.payload
                    }
                case UPDATE_COMMENT: 
                return{
                        ...state,
                        ...action.payload,
                        comment: [...action.payload]

                } 
                case GET_SINGLE_COMMENT: 
                return{
                    ...state,
                    ...action.payload
                }   

                case DELETE_COMMENT:
                    return state.filter((comment)=> comment.id != action.payload.id)
                    
            default:
                return state; 
    }
}