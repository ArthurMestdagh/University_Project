import {SET_VIEW} from '../types'

export default function(state= {}, action){
    switch(action.type){
        case SET_VIEW:
            return{
                ...state,
                view: action.payload
            }
        default:
            return state;
    }
}