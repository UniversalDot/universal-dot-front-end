import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import { SubstrateContextProvider } from './substrate-lib';

import styles from './styles/testing.module.scss';

import {
  TemplateResources,
  SignUp,
  SignIn,
  Home,
  Profile,
  Dashboard,
  Tasks,
  Organization,
  Calendar,
} from './pages';

import { Header } from './components';

export default function App() {
  const loggedIn = true;

  return (
    <BrowserRouter>
      {loggedIn && <Header />}
      <div className={styles.testTwo}>testtttttttttt</div>
      <Routes>
        <Route
          path="/*"
          element={
            loggedIn ? <Home /> : <Navigate replace to="/auth/sign-in" />
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="organization" element={<Organization />} />
          <Route path="calendar" element={<Calendar />} />
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
