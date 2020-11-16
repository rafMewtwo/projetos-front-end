import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, ShoppingCart, ProductDetails } from './pages';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/cart" component={ ShoppingCart } />
        <Route
          path="/productDetails/:productId"
          render={ (props) => <ProductDetails { ...props } /> }
        />
      </Switch>
    </Router>
  );
}

export default App;
