import React, { useState, useEffect, useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Auxiliary/auxilliary';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/';


// Componente principal, onde toda a lógica está localizada.

const BurguerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const ingr = useSelector(state => {
        return state.burguerBuilder.ingredients
    })
    const tPrice = useSelector(state=>{
        return state.burguerBuilder.totalPrice
    })
    const err = useSelector(state =>{ 
        return state.burguerBuilder.error
    })
    const isAuthenticated = useSelector(state =>{
        return state.auth.token !== null
    })

    const onAddIngredients = ingredientName => dispatch(actions.addIngredient(ingredientName));
    const onDeleteIngredients= ingredientName => dispatch(actions.deleteIngredient(ingredientName));
    const onInitIngredients= () => useCallback(dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase= () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath= path => dispatch(actions.setAuthRedirectPath(path));

    useEffect(()=>{
     onInitIngredients();
    }, [onInitIngredients])
  
   const updatedPurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0;
    }

   const purchaseHandler = () => {
        if(isAuthenticated) {
         setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
        
    }

   const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

   const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

        const disabledInfo = {
            ...ingr
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burguer = err ? <p>Ingredients cant be loaded</p> : <Spinner />
        if (ingr) {
            burguer = (
                <Aux style={{ display: 'flex', flexDirection: 'column' }}>
                    <Burguer ingredients={ingr} />
                    <BuildControls
                        ingredientAdded={onAddIngredients}
                        ingredientRemoved={onDeleteIngredients}
                        disabled={disabledInfo}
                        price={tPrice}
                        purchasable={updatedPurchaseState(ingr)}
                        order={purchaseHandler} 
                        isAuth={isAuthenticated}/>
                </Aux>
            )
            orderSummary = <OrderSummary
                ingredients={ingr}
                cancel={purchaseCancelHandler}
                continue={purchaseContinueHandler}
                price={tPrice} />

        }
        return (
            <Aux>
                < Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burguer}
            </Aux>
        );
    }

export default withErrorHandler(BurguerBuilder, axios);