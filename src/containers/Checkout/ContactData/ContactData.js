import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/'

import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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

    checkValidity(value, rules) {   // metodo para checkar se o formulario é valido ou não
        let isValid = true;

        if (rules.required) {   // checka se existe as regras de validação
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) { // checka se esta dentro da quantidade minima de caracteres
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {  // checka se esta dentro da quantidade maxima de caracteres
            isValid = value.length <= rules.maxLength && isValid;
        }
        
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (e, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm   //clona o state antigo
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]  //clona o objeto especifico no state antigo
        };
        updatedFormElement.value = e.target.value; //atribui ao value no objeto especifico clonado ao value do input
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);   // faz a chamada ao método pra checkar se o formulário é valido ou não
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement; //atualiza o valor no state clonado
        
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