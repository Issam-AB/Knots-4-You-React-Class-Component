import React from 'react'
import { Switch, Route } from 'react-router-dom';

import About from './pages/About'
import Cart from './pages/Cart'


function routes() {
    return (
        <Switch>
          <Route path="about" component={About} />
          <Route path="/cart" component={Cart} />
        </Switch>
    )
}
export default routes;
