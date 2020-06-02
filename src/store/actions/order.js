import * as actionTypes from './actionTypes';

export const purchaseBurguerSuccess = (id, orderData) =>{
    return{
        type: actionTypes.PURCHASE_BURGUER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurguerFail = (err) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_FAIL,
        error: err
    }
}

export const purchaseBurguerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGUER_START
    }
}

export const purchaseBurguer = (orderData , token) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_INIT,
        orderData: orderData,
        token: token
    }
}

export const purchaseInit = () => {
    return{
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (err) => {
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: err
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT,
        token:token,
        userId: userId
    }
}