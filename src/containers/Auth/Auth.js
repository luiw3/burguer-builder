import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components//UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';
import * as actions from '../../store/actions';

import { updateObject, checkValidity } from '../../shared/utility';


const Auth = props => {
    const [controls, setControls] = useState({
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
    })
    const [isSignup, setIsSignup] = useState(true);
    const {buildingBurguer, authRedirectPath, onSetAuthRedirectPath} = props;

    useEffect(()=>{
    if (!buildingBurguer && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [buildingBurguer, authRedirectPath, onSetAuthRedirectPath])
 
   const inputChangedHandler = (e, controlName) => {
        const updatedKeyControl = updateObject(controls[controlName], {
            value: e.target.value,
            valid: checkValidity(e.target.value, controls[controlName].validation),
            touched: true
        })
        const updatedControls = updateObject(controls, {
            [controlName]: updatedKeyControl
        })
        setControls(updatedControls);
    }

   const submitHandler = (e) => {
        e.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignup);
    }

   const switchAuthModeHandler = () => {
        setIsSignup(!isSignup)
    }

        const formElementsArray = [];

        for (let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key]  // transforma o objeto no array formElements com o nome e as configurações
            })
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(e) => inputChangedHandler(e, formElement.id)}
            />

        ));
        if (props.loading) {
            form = <Spinner />
        }

        let errorMessage = null

        if (props.error) {
            errorMessage = (<p> {props.error.message} </p>)
        }

        let authRedirect = null;

        if (props.isAuthenticated) {
            authRedirect = <Redirect to={authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button clicked={switchAuthModeHandler} btnType="Danger">CHANGE TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        )
    }


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurguer: state.burguerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);