import React, { Component } from 'react';

import Aux from '../../../hoc/Auxiliary/auxilliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component  {
    // This could be a functional component
    // componentDidUpdate(){
    //     console.log('[OrderSummary] did update')
    // }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map((ingKey,index)=>{
           
        return <li key={index}>
            <span style={{textTransform: 'capitalize'}}>{ingKey}</span>
            :{this.props.ingredients[ingKey]}
            </li>
        });

        return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burguer with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            < Button btnType="Danger" clicked={this.props.cancel}>CANCEL</Button>
            < Button btnType="Success" clicked={this.props.continue}>CONTINUE </Button>
        </Aux>
        );
    }
    
}

export default OrderSummary; 