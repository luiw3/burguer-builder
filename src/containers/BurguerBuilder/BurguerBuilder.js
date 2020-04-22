import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary/auxilliary';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
// Componente principal, onde toda a lógica está localizada.

/**  
 * teste caraio
 */ 

class BurguerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('ingredients.json')
        .then(response=>{
            this.setState({ingredients : response.data})
        })
        .catch(err=>{
            this.setState({error: true})
        });
    }
    updatedPurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
           return ingredients[igKey] 
        })
        .reduce((sum,el)=>{
            return sum + el
        },0)
        this.setState({purchasable: sum>0})
    }

    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = 
        {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice:newPrice,
            ingredients:updatedIngredients
        })
        this.updatedPurchaseState(updatedIngredients);
    } 
    
     deleteIngredientsHandler = (type)=> {
        const oldCount = this.state.ingredients[type];
        if (oldCount <=0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = 
        {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice:newPrice,
            ingredients:updatedIngredients
        })
        this.updatedPurchaseState(updatedIngredients);
   
    }
    purchaseHandler = ()=> {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        //alert('You Continue!');
        this.setState({loading: true})
        const order= {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Luis',
                address: {
                    street: 'Presidente Costa e Silva',
                    zipCode:'13172192',
                    country: 'Brazil'
                },
                email: 'luisinh@luis.luis'
            },
            deliveryMethod : 'fatest'
        }
        axios.post('/orders.json',order)
        .then(response=>{
            this.setState({loading: false, purchasing: false});
        })
        .catch(error=> {
            this.setState({loading: false, purchasing: false});
        })

    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burguer = this.state.error? <p>Ingredients cant be loaded</p> : <Spinner />
        if (this.state.ingredients){
            burguer = (
            <Aux>
        <Burguer ingredients={this.state.ingredients}/>
        <BuildControls 
        ingredientAdded={this.addIngredientsHandler}
        ingredientRemoved={this.deleteIngredientsHandler}
        disabled={disabledInfo}
        price={this.state.totalPrice}
        purchasable={this.state.purchasable}
        order={this.purchaseHandler}/>
            </Aux>
        )
        orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        cancel={this.purchaseCancelHandler}
        continue={this.purchaseContinueHandler}
        price={this.state.totalPrice}/>

        }
        if(this.state.loading) {
            orderSummary= <Spinner/>
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


export default withErrorHandler(BurguerBuilder, axios);