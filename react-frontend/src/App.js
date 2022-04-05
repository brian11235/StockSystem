import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListStockComponent from './components/ListStockComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateStockComponent from './components/CreateStockComponent';
import LoginComponent from "./components/LoginComponent";
import CreateUserComponent from "./components/CreateUserComponent";
import DashboardComponent from "./components/DashboardComponent";
import SearchStockComponent from "./components/SearchStockComponent";
import OrderComponent from "./components/OrderComponent";
import TransferCashComponent from "./components/TransferCashComponent";
import StatementComponent from "./components/StatementComponent";
import MarketControlComponent from "./components/MarketControlComponent";
import OrderLimitComponent from "./components/OrderLimitComponent";
import ViewLimitOrderComponent from "./components/ViewLimitOrderComponent";

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch>
                        <Route path = "/" exact component = {LoginComponent}></Route>
                        <Route path = "/login" exact component = {LoginComponent}></Route>
                        <Route path = "/signUp" exact component = {CreateUserComponent}></Route>
                        <Route path = "/list" exact component = {ListStockComponent}></Route>
                        <Route path = "/dashboard/" component = {DashboardComponent}></Route>
                        <Route path = "/statement/" component = {StatementComponent}></Route>
                        <Route path = "/search" component = {SearchStockComponent}></Route>
                        <Route path = "/order" component = {OrderComponent}></Route>
                        <Route path = "/transfer" component = {TransferCashComponent}></Route>
                        <Route path = "/addstock" component = {CreateStockComponent}></Route>
                        <Route path = "/market" component = {MarketControlComponent}></Route>
                        <Route path = "/orderLimit" component = {OrderLimitComponent}></Route>
                        <Route path = "/viewLimit" component = {ViewLimitOrderComponent}></Route>
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
