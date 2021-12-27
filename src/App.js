import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import { SubstrateContextProvider } from './substrate-lib';

import { TemplateResources, SignUp, SignIn, Home } from './pages';

import { Header } from './components';

export default function App() {
  const loggedIn = true;

  return (
    <BrowserRouter>
      {loggedIn && <Header />}
      <Routes>
        <Route
          path="/*"
          element={
            loggedIn ? <Home /> : <Navigate replace to="/auth/sign-in" />
          }
        >
          <Route
            path="activity"
            element={
              <div>
                <h3>Activity</h3>
              </div>
            }
          />
          <Route
            path="dashboard"
            element={
              <div>
                <h3>Dashboard</h3>
              </div>
            }
          />
          <Route
            path="tasks"
            element={
              <div>
                <h3>Tasks</h3>
              </div>
            }
          />
          <Route
            path="organizer"
            element={
              <div>
                <h3>Organizer</h3>
              </div>
            }
          />
          <Route
            path="calendar"
            element={
              <div>
                <h3>Calendar</h3>
              </div>
            }
          />
        </Route>
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
