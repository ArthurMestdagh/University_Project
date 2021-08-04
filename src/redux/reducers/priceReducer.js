import {SET_PRICE} from '../types'

export default function(state= {}, action){
    switch(action.type){
        case SET_PRICE:
            return{
                ...state,
                price: action.payload
            }
        default:
            return state;
    }
}