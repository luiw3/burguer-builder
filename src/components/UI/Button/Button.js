import React from 'react';

import classes from './Button.module.css';
/**
 * Apenas um botão que pode ser reutilizado em outros componentes, com valores passados dinâmicamente.
 */
const button = (props) => {

    return (
    <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}>{props.children}</button>
    );
}

export default button;