import {SET_RECALCU} from '../types'

export default function(state= {}, action){
    switch(action.type){
        case SET_RECALCU:
            return{
                ...state,
                recalcu: action.payload
            }
        default:
            return state;
    }
}