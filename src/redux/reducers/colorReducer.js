import {SET_COLOR} from '../types'

export default function(state= {}, action){
    switch(action.type){
        case SET_COLOR:
            return{
                ...state,
                color: action.payload
            }
        default:
            return state;
    }
}