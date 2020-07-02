/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';
// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import { HashRouter, Switch, Route, withRouter, Redirect } from 'react-router-dom';
import CustomersPage from './pages/CustomersPage';
import CustomersPagePagination from './pages/CustomersPagePagination';
import InvoicesPage from './pages/InvoicesPage';
import LoginPage from './pages/LoginPage';
import AuthApi from './services/AuthApi';
import AuthContext from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute';

AuthApi.setUp();


const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.isAuthenticated());

    const NavBarWithRouter = withRouter(Navbar);

    return (
        // Passage de valeur globale a l'ensemble des élements encapsulés dans AuthContext.Providers
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <HashRouter>
                <NavBarWithRouter />
                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <PrivateRoute path="/customers" component={CustomersPage} />
                        <PrivateRoute path="/invoices" component={InvoicesPage} />
                        <Route path="/" component={Homepage} />
                    </Switch>
                </main>
            </HashRouter>
        </AuthContext.Provider>
    )
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement)