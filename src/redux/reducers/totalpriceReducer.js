import {SET_TOTALPRICE} from '../types'

export default function(state= {}, action){
    switch(action.type){
        case SET_TOTALPRICE:
            return{
                ...state,
                totalprice: action.payload
            }
        default:
            return state;
    }
}