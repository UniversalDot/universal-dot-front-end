import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './styles/styles.scss';

import {
  TemplateResources,
  SignUp,
  SignIn,
  Profile,
  Dashboard,
  // Tasks,
  Organization,
  Calendar,
  ProfileConfigure,
} from './pages';

import { Header, Layout, LoaderFullPage } from './components';
import { useProfile } from './hooks/useProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const loggedIn = true;

  const { getProfile } = useProfile();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <BrowserRouter>
      {loggedIn && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? <Layout /> : <Navigate replace to="/auth/sign-in" />
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="profile/configure" element={<ProfileConfigure />} />

          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="tasks" element={<Tasks />} /> */}
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
        <Route path="*" element={<Navigate replace to="/" />}></Route>
      </Routes>
      <ToastContainer newestOnTop />
      <LoaderFullPage />
    </BrowserRouter>
  );
}
