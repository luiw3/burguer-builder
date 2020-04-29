import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/auxilliary';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionType from '../../store/action';


// Componente principal, onde toda a lógica está localizada.

/**  
 * teste caraio
 */

class BurguerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients:response.data})
        //     })
        //     .catch(err => {
        //         this.setState({ error: true })
        //     });
    }

    updatedPurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }
    render() {
        const disabledInfo = {
            ...this.props.ingr
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burguer = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner />
        if (this.props.ingr) {
            burguer = (
                <Aux style={{ display: 'flex', flexDirection: 'column' }}>
                    <Burguer ingredients={this.props.ingr} />
                    <BuildControls
                        ingredientAdded={this.props.onAddIngredients}
                        ingredientRemoved={this.props.onDeleteIngredients}
                        disabled={disabledInfo}
                        price={this.props.tPrice}
                        purchasable={this.updatedPurchaseState(this.props.ingr)}
                        order={this.purchaseHandler} />
                </Aux>
            )
            orderSummary = <OrderSummary
                ingredients={this.props.ingr}
                cancel={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler}
                price={this.props.tPrice} />

        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                < Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burguer}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingr: state.ingredients,
        tPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredients: (ingredientName) => dispatch({type:actionType.ADD_INGREDIENT, ingredientName: ingredientName}),
        onDeleteIngredients: (ingredientName) => dispatch({type:actionType.DELETE_INGREDIENT, ingredientName: ingredientName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));