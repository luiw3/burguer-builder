import { put } from 'redux-saga/effects';

import * as actions from '../actions/'
import axios from '../../axios-orders';

export function* initIngredientsSaga(action) {
   try { 
    const response = yield axios.get('ingredients.json');
    yield put(actions.setIngredients(response.data));
    } catch(err) { 
    put(actions.fetchIngredientsFail());
    }
}