import * as actionTypes from './actionTypes';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const deleteIngredient = (ingName) => {
    return {
        type: actionTypes.DELETE_INGREDIENT,
        ingredientName: ingName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFail = () => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAIL
    }
}

export const initIngredients = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS
    }
}