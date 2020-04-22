import React, { Component } from 'react';

import classes from './Modal.module.css';

import Aux from '../../../hoc/Auxiliary/auxilliary';
import Backdrop from '../Backdrop/Backdrop';


/** Um componente que contém um modal que pode ser reutilizado dentro do projeto,
 * com propriedades passadas dinamicamente
 */

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
      return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentDidUpdate() {
        console.log('[Modal] did update')
    }

    render() {

        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                    className={classes.Modal}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;