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
import Modules from '../pages/Modules';
import Questions from '../pages/Questions';
import Register_content from '../pages/Register_content';
import Profile from '../pages/Profile';
import Invest from '../pages/Invest';
import Investment from '../pages/Investment';
import Redeem from '../pages/Redeem';

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
      <Route path="/register_content" component={Register_content} isPrivate />
      <Route path="/modules" component={Modules} isPrivate />
      <Route path="/questions/:module_id" component={Questions} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/invest" component={Invest} isPrivate />
      <Route path="/investment" component={Investment} isPrivate />
      <Route path="/redeem" component={Redeem} isPrivate />
    </Switch>
  );
}
