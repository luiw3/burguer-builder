import React from 'react';

import burguerLogo from '../../assets/images/burguer-logo.png';
import classes from './Logo.module.css'
/**
 * Componente reutilizavel que contém a logo do projeto, com a altura sendo passada dinamicamente.
 */
const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burguerLogo} alt="logo"/>
    </div>
)


export default logo;