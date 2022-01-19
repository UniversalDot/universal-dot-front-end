import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './styles/styles.scss';

import { SubstrateContextProvider } from './substrate-lib';

import {
  TemplateResources,
  SignUp,
  SignIn,
  Profile,
  Dashboard,
  Tasks,
  Organization,
  Calendar,
  ProfileConfigure,
} from './pages';
import { Dimmer, Loader } from 'semantic-ui-react';

import { Header, Layout } from './components';
import { useStatus } from './hooks/useStatus';

export default function App() {
  const loggedIn = true;
  const { status, setStatus } = useStatus();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (
      !!status &&
      (status.includes('Current transaction status') ||
        status.includes('Sending...'))
    ) {
      setShowLoader(true);
    }

    if (!!status && status.includes('Finalized')) {
      setShowLoader(false);
      setTimeout(() => {
        setStatus('');
      }, 5000);
    }
  }, [status, setStatus]);

  return (
    <BrowserRouter>
      <SubstrateContextProvider>
        {showLoader && (
          <Dimmer active>
            <Loader size="small">{status}</Loader>
          </Dimmer>
        )}
        {loggedIn && <Header />}
        <Routes>
          <Route
            path="/*"
            element={
              loggedIn ? <Layout /> : <Navigate replace to="/auth/sign-in" />
            }
          >
            <Route path="profile" element={<Profile />} />
            <Route path="profile/configure" element={<ProfileConfigure />} />

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
          <Route path="template-resources" element={<TemplateResources />} />
        </Routes>
      </SubstrateContextProvider>
    </BrowserRouter>
  );
}
