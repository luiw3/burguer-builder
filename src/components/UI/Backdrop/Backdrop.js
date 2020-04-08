import React from 'react';

import classes from './Backdrop.module.css';

/** 
 * Componente pra escurecer a tela quando a sidebar ou o modal estiverem abertos, também fecha os mesmos ao clickar
 */
const backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
)

export default backdrop