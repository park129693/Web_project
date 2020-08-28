import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Menu from './Menu'
import Home from './Home'
import Items from './Items'
import SignIn from './SignIn'
import SignUp from './SignUp'
import SignOut from './SignOut'
import WithAuth from './WithAuth'

const Main = () => {
    return (
        <Router> 
            <Route component={Menu} />
            <Switch>
                <Route exact path="/" >
                    <Home />
                </Route>
                <Route path="/items" >
                    <WithAuth>
                        <Items />
                    </WithAuth>
                </Route>
                <Route path="/signin" >
                    <SignIn />
                </Route>
                <Route path="/signup" >
                    <SignUp />
                </Route>
                <Route path="/signout" >
                    <SignOut />
                </Route>
            </Switch> 
        </Router>
    )
}
export default Main