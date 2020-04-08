import React from 'react';

import classes from './NavigationItem.module.css';

const navItem = (props) => (
         <li className={classes.NavigationItem}>
            <a 
            href={props.children}
            className={props.active? classes.active : null}>{props.children}</a>
        </li>
)

export default navItem