import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Main from '~/pages/Main';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Confirmation from '../pages/SignIn/Confirmation';
import RecoverPassword from '../pages/SignIn/RecoverPassword';
import ResetPassword from '../pages/SignIn/ResetPassword';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/login" component={SignIn} />
      <Route path="/confirmation" component={Confirmation} />
      <Route path="/recover-password" component={RecoverPassword} />
      <Route path="/reset-password/:token" component={ResetPassword} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
