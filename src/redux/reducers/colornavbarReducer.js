import {SET_COLORNAVBAR} from '../types'

export default function(state= {}, action){
    switch(action.type){
        case SET_COLORNAVBAR:
            return{
                ...state,
                colornavbar: action.payload
            }
        default:
            return state;
    }
}