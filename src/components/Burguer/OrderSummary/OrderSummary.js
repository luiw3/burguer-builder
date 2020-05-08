import React from 'react';

import Aux from '../../../hoc/Auxiliary/auxilliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) =>  {
    // This could be a functional component
    // componentDidUpdate(){
    //     console.log('[OrderSummary] did update')
    // }

    
        const ingredientSummary = Object.keys(props.ingredients)
        .map((ingKey,index)=>{
           
        return <li key={index}>
            <span style={{textTransform: 'capitalize'}}>{ingKey}</span>
            :{props.ingredients[ingKey]}
            </li>
        });

        return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burguer with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            < Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
            < Button btnType="Success" clicked={props.continue}>CONTINUE </Button>
        </Aux>
        );
    }
    


export default OrderSummary; 