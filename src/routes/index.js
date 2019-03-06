import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Main from '../pages/main'

import Footer from '../components/Footer'

const Routes = () => (
  <BrowserRouter>
    <>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
      <Footer />
    </>
  </BrowserRouter>
)

export default Routes
