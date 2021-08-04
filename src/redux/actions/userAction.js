import {SET_USER, SET_MTYPE, SET_LAMBDA, SET_MLIST, SET_LAYER, SET_LAYERLIST, SET_UPDATEU, SET_MATERIAL, SET_DELETE, SET_COLOR, SET_VIEW, SET_COLORNAVBAR, SET_TOTALU, SET_RECALCU, SET_PRICE,SET_TOTALPRICE} from '../types'

export const identifyUser = (data) => (dispatch) => {
    console.log('action')
    dispatch({
        type: SET_USER,
        payload: data
    })
}

export const choseMType = (data) => (dispatch) => {
    console.log('action')
    dispatch({
        type: SET_MTYPE,
        payload: data
    })
}

export const setMaterialList = (url) => async (dispatch) => {   
    console.log('action setMaterialDatabase')   
    const response = await fetch(url) ;
    const data = await response.json();
    let totalList = []; 
    
    data.forEach((element) => {
        totalList.push(element) 
    })
    console.log('totalList fetched:', totalList)
    dispatch({
        type: SET_MLIST,
        payload: totalList
    })
}

export const getLambda = (data) => (dispatch) => {
    console.log('action')
    dispatch({
        type: SET_LAMBDA,
        payload: data
    })
}





//LAYER

export const saveCurrentLayer = (data) => (dispatch) => {
    console.log('action: setting current layer')
    dispatch({
        type: SET_LAYER,
        payload: data
    })
}

//LAYERLIST

export const saveLayerList = (data) => (dispatch) => {
    console.log('action: saving layerlist')
    dispatch({
        type: SET_LAYERLIST,
        payload: data
    })
}


// To save function to update Uvalue

export const updateU = (data) => (dispatch) => {
    dispatch({
        type: SET_UPDATEU,
        payload: data
    })
}



// To save function to set material

export const setMaterial = (data) => (dispatch) => {
    dispatch({
        type: SET_MATERIAL,
        payload: data
    })
}


// To save function to delete layer

export const saveDelete = (data) => (dispatch) => {
    dispatch({
        type: SET_DELETE,
        payload: data
    })
}


// To save function to update color

export const updateColor = (data) => (dispatch) => {
    dispatch({
        type: SET_COLOR,
        payload: data
    })
}

// To save function to update 3Dview

export const updateView = (data) => (dispatch) => {
    dispatch({
        type: SET_VIEW,
        payload: data
    })
}


// To save function to update color in navbar

export const updateColorNavbar = (data) => (dispatch) => {
    dispatch({
        type: SET_COLORNAVBAR,
        payload: data
    })
}

// To save function so save total U

export const setTotalU = (data) => (dispatch) => {
    dispatch({
        type: SET_TOTALU,
        payload: data
    })
}

// To save function to calculate Uvalue after changing material without changing thickness

export const recalcU = (data) => (dispatch) => {
    dispatch({
        type: SET_RECALCU,
        payload: data
    })
}


// To save function update price

export const updatePrice = (data) => (dispatch) => {
    dispatch({
        type: SET_PRICE,
        payload: data
    })
}

// To save total price

export const savePrice = (data) => (dispatch) => {
    dispatch({
        type: SET_TOTALPRICE,
        payload: data
    })
}



