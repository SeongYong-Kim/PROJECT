/*

=========================================================
* Now UI Kit React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2020 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.4.0";
import "assets/demo/demo.css?v=1.4.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.4.0";
// pages for this kit
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LoginPage from "views/examples/LoginPage.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import AllCall from "views/examples/allCall.js";
import InsertPage from "views/examples/JoinUs.js"
import TicketCall from "views/examples/ticketCall.js"
import Admin from "views/examples/Admin.js"
import MyPage from "views/examples/MyPage.js"
import Search from "views/examples/Search.js"
import Match from "views/examples/Match.js"
import Refund from "views/examples/Refund.js"
// import CafePage from "views/examples/cafePage.js";
// import CafePage1 from "views/examples/cafePage1.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/index" render={(props) => <Index {...props} />} />
        <Route
          path="/nucleo-icons"
          render={(props) => <NucleoIcons {...props} />}
        />
        <Route
          path="/landing-page"
          render={(props) => <LandingPage {...props} />}
        />
        <Route
          path="/profile-page"
          render={(props) => <ProfilePage {...props} />}
        />
        <Route
          path="/login-page"
          render={(props) => <LoginPage {...props} />}
        />
        <Route path="/allCall" render = {(props) => <AllCall {...props}/>} />
        <Route path = "/joinus" render = {(props) => <InsertPage {...props}/> }/>
        <Route path = "/ticketcall" render = {(props) => <TicketCall {...props}/> }/>
        <Route path = "/admin" render = {(props) => <Admin {...props}/> }/>
        <Route path = "/mypage" render = {(props) => <MyPage {...props}/> }/>
        <Route path = "/search" render = {(props) => <Search {...props}/> }/>
        <Route path = "/match" render = {(props) => <Match {...props}/> }/>
        <Route path = "/refund" render = {(props) => <Refund {...props}/> }/>
        <Redirect to="/index" />
        <Redirect from="/" to="/index" />      
      </Switch>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
