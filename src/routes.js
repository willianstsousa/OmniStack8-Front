import React from 'react';
import {BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/login';
import Main from './pages/main';

export default function Rotas(){
    return(
    <BrowserRouter>
        <Route path='/' exact component={Login} />
        <Route path='/dev/:idDev' component={Main} />
    </BrowserRouter>
)};