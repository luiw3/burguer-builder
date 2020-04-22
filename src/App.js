import React,{Component} from 'react';

import Layout from './hoc/Layout/Layout'
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
       <div >
     <Layout>
       <Route path="/" exact component={BurguerBuilder}/>
       <Route path="/checkout"  component={Checkout} />
       <Route path="/orders" component={Orders} />
     </Layout>
    </div>
      </BrowserRouter>
   
  );
  }
}

export default App;
