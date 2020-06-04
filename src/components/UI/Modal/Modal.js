import React from 'react';

import classes from './Modal.module.css';

import Aux from '../../../hoc/Auxiliary/auxilliary';
import Backdrop from '../Backdrop/Backdrop';


/** Um componente que contém um modal que pode ser reutilizado dentro do projeto,
 * com propriedades passadas dinamicamente
 */

const Modal = props => {

    // shouldComponentUpdate(nextProps, nextState) {
    //   return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    // }
        return (
            <Aux>
                <Backdrop show={props.show} clicked={props.modalClosed} />
                <div
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}
                    className={classes.Modal}>
                    {props.children}
                </div>
            </Aux>
        );
    }


export default React.memo(Modal, (prevProps, nextProps) => nextProps === prevProps.show && nextProps.children === prevProps.children);