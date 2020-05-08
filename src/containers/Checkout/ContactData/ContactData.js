import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/'

import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import {updateObject, checkValidity} from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: { //Cada elemento no formulário tem um key value (nome) e as configurações.
            name: {  //<- NOME
                elementType: 'input',               //  _   Tipo do input
                elementConfig: {                    //   _
                    type: 'text',                   //    _  Configurações
                    placeholder: 'Your Name',       //
                },
                value: '',                      // Informações
                validation: {
                    required: true              // regras para validar o formulário
                },
                valid: false,               // define se o formulário é valido ou não
                touched: false              // define se o formulário foi "tocado" ou não
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength:5,
                    maxLength:5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fatests', displayValue: 'Fatest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            },
        },
        formIsValid: false,         // checka se o formulário num geral é valido
    }

    orderHandler = (e) => {
        e.preventDefault();
        const formData = {}
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value; // atribui o nome do identificador ao valor do mesmo no state
        }
        const order = {
            ingredients: this.props.ingr,
            price: this.props.tPrice,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurguer(order,this.props.token);
    }


    inputChangedHandler = (e, inputIdentifier) => {
       
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value:e.target.value,
            valid: checkValidity(e.target.value,this.state.orderForm[inputIdentifier].validation),
            touched:true
        })
        const updatedOrderForm = updateObject(this.state.orderForm,{
            [inputIdentifier]: updatedFormElement
        })
        
        let formIsValid = true; 

        for (let inputIdentifier in updatedOrderForm) {
          formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid }); //atualiza o state
    }

    render() {
        const formElementsArray = [];

        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]  // transforma o objeto no array formElements com o nome e as configurações
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => ( //renderiza um componente pra cada valor presente no array passando as informações do state como props para o componente personalizado
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(e) => this.inputChangedHandler(e, formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ingr: state.burguerBuilder.ingredients,
        tPrice: state.burguerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
     onOrderBurguer: (orderData, token) => dispatch(actions.purchaseBurguer(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));