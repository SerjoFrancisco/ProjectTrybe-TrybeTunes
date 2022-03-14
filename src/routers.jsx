import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search/index';
import Album from './pages/Album/index';
import Favorites from './pages/Favorites/index';
import Profile from './pages/Profile/index';
import ProfileEdit from './pages/Profile/Edit/index';
import NotFound from './pages/NotFound/index';
import Loading from './pages/Loading';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/search" component={ Search } />
    <Route exact path="/album/:id" component={ Album } />
    <Route exact path="/favorites" component={ Favorites } />
    <Route exact path="/profile" component={ Profile } />
    <Route exact path="/profile/edit" component={ ProfileEdit } />
    <Route exact path="/loading" component={ Loading } />
    <Route path="*" component={ NotFound } />
  </Switch>
);

export default Routes;
