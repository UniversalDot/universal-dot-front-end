import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import { SubstrateContextProvider } from './substrate-lib';

import { TemplateResources, SignUp, SignIn, Home } from './pages';

export default function App() {
  const loggedIn = true;

  return (
    <BrowserRouter>
      {loggedIn && <div>NAVBAR</div>}
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? <Home /> : <Navigate replace to="/auth/sign-in" />
          }
        />
        <Route
          path="/auth/sign-in"
          element={!loggedIn ? <SignIn /> : <Navigate replace to="/" />}
        />
        <Route
          path="/auth/sign-up"
          element={!loggedIn ? <SignUp /> : <Navigate replace to="/" />}
        />
        <Route
          path="template-resources"
          element={
            <SubstrateContextProvider>
              <TemplateResources />
            </SubstrateContextProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
