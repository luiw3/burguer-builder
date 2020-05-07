import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components//UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';
import * as actions from '../../store/actions';


class Auth extends Component {
    state = {
        controls: {
            email: {  
                elementType: 'input',              
                elementConfig: {                    
                    type: 'email',                   
                    placeholder: 'Mail Address',      
                },
                value: '',                     
                validation: {
                    required: true,
                    isEmail: true        
                },
                valid: false,               
                touched: false              
            },
            password: {  
                elementType: 'input',               
                elementConfig: {                    
                    type: 'password',                 
                    placeholder: 'Password',      
                },
                value: '',                     
                validation: {
                    required: true,
                    minLength: 6            
                },
                valid: false,               
                touched: false              
            }
        },
        isSignUp: true

    }

    componentDidMount() {
        if (!this.props.buildingBurguer && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
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

    inputChangedHandler = (e, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: e.target.value,
                valid: this.checkValidity(e.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls})
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }

    render() {
        const formElementsArray = [];

        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]  // transforma o objeto no array formElements com o nome e as configurações
            })
        }

        let form = formElementsArray.map(formElement=>(
            <Input
             key={formElement.id}
             elementType={formElement.config.elementType}
             elementConfig={formElement.config.elementConfig}
             value={formElement.config.value}
             invalid={!formElement.config.valid}
             shouldValidate={formElement.config.validation}
             touched={formElement.config.touched}
             changed={(e)=> this.inputChangedHandler(e, formElement.id)}
            />

        ));
        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null

        if(this.props.error) {
        errorMessage = ( <p> {this.props.error.message} </p>)
        }

        let authRedirect = null;

        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler} btnType="Danger">CHANGE TO {this.state.isSignUp? 'SIGNIN':'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurguer: state.burguerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email,password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);