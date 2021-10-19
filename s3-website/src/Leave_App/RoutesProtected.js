import React from 'react';
import { Redirect, Route } from 'react-router-dom';



const ProtectedRoute = ({ component: Comp, ...rest }) => {
  const getTokens = localStorage.getItem('tokens');
  return <Route {...rest}
    render={() => (getTokens) ? <Comp /> : <Redirect to='/' />
    }
  />
}


const SignInRoute = ({ component: Comp, ...rest }) => {
  const getTokens = localStorage.getItem('tokens');
  return <Route {...rest}
    render={() => (getTokens) ? <Redirect to='/pending-request' /> : <Comp />
    }
  />
}


export { ProtectedRoute, SignInRoute };