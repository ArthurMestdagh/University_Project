import {SET_DELETE} from '../types'

export default function(state= {}, action){
    switch(action.type){
        case SET_DELETE:
            return{
                ...state,
                delete: action.payload
            }
        default:
            return state;
    }
}