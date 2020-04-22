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
        
        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search:'?' + queryString});

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
            <Aux style={{display: 'flex', flexDirection: 'column'}}>
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