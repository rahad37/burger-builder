import axios from 'axios';

import * as actionTypes from './ActionTypes'

export const addIngredient = igType =>{
    return{
        type: actionTypes.ADD_INGREDIENT,
        payload: igType,
    }
}

export const removeIngredient = igType =>{
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igType,
    }
}

export const updatePurchasable = () =>{
    return {
        type: actionTypes.UPDATE_PURCHASABLE
    }
}

export const resetIngredient = () =>{
    return {
        type: actionTypes.RESET_INGREDIENT,
    }
}

export const loadOrders = orders =>{
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: orders,
    }
}
export const orderLoadFailed = () => {
    return{
        type: actionTypes.ORDER_LOAD_FAILED,
    }
}

export const fetchOrders = (token, userId) => dispatch =>{

    const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';

    axios.get('https://burger-builder-f9e2a-default-rtdb.firebaseio.com/orders.json?auth=' + token + queryParams)
    .then(response => {
        dispatch(loadOrders(response.data));
    })
    .catch(err =>{
        dispatch(orderLoadFailed());
    })
}