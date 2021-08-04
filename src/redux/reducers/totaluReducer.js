import {SET_TOTALU} from '../types'

export default function(state= {}, action){
    switch(action.type){
        case SET_TOTALU:
            return{
                ...state,
                totalu: action.payload
            }
        default:
            return state;
    }
}