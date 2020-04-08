import React, { Component } from 'react';
import Aux from '../Auxiliary/auxilliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

import classes from './Layout.module.css';


/**
 * Também serve o próprosito de ser um wrapper, visto que renderiza elementos presentes em toda a página
 * e é colocado em volta ao conteúdo principal no arquivo App.js
 * 
 */
class Layout extends Component {
    state ={
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerOpenHandler = () => {
        this.setState( (prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        }
        )           
    }
    render() {

        return (
            <Aux>
                <Toolbar 
                open={this.sideDrawerOpenHandler}/>
                <Sidedrawer 
                closed={this.sideDrawerClosedHandler}
                open={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }

}


export default Layout;