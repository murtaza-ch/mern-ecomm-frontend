import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import CartScreen from "./screens/CartScreen";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OrderListScreen from "./screens/OrderListScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import React from "react";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact path="/order/:id" component={OrderScreen} />
            <Route exact path="/shipping" component={ShippingScreen} />
            <Route exact path="/payment" component={PaymentScreen} />
            <Route exact path="/placeorder" component={PlaceOrderScreen} />
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/profile" component={ProfileScreen} />
            <Route exact path="/product/:id" component={ProductScreen} />
            <Route exact path="/cart/:id?" component={CartScreen} />
            <Route exact path="/admin/userlist" component={UserListScreen} />
            <Route
              exact
              path="/admin/productlist"
              component={ProductListScreen}
            />
            <Route
              exact
              path="/admin/productlist/:pageNumber"
              component={ProductListScreen}
            />
            <Route
              exact
              path="/admin/user/:id/edit"
              component={UserEditScreen}
            />
            <Route
              exact
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
            <Route exact path="/admin/orderlist" component={OrderListScreen} />
            <Route exact path="/search/:keyword" component={HomeScreen} />
            <Route path="/page/:pageNumber" component={HomeScreen} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
            />
            <Route exact path="/" component={HomeScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
