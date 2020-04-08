import React from 'react';
import classes from './Toolbar.module.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleButton from '../Sidedrawer/ToggleButton/ToggleButton';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <ToggleButton clicked={props.open}/>
            <div className={classes.Logo}>
              <Logo />  
            </div>
            
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default toolbar;