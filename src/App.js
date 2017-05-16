import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import { Provider } from 'react-redux';
import { Col, Grid, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Layout from './Layout';
import RequireAuth from './RequireAuth';
import Welcome from './Pages/Welcome';
import Profile from './Pages/Profile';
import Signup from './Auth/Signup';
import Confirm from './Auth/Confirm';
import Login from './Auth/Login';
import store from './store';


const MyRoutes = () => (
  <Router>
    <div>
      <Route path="/" exact component={Welcome} />
      <Route path="/profile" component={RequireAuth(Profile)} />
      <Route path="/signup" component={Signup} />
      <Route path="/confirm" component={Confirm} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
);

const App = () => (
  <Provider store={store}>
    <Grid>
      <Row>
        <Col xs={3}></Col>
        <Col xs={6}>
          <Layout>
            <MyRoutes />
          </Layout>
        </Col>
        <Col xs={3}></Col>
      </Row>
    </Grid>
  </Provider>
);


export default App;
