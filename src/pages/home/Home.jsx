import React from 'react';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home Page / Dashboard</h1>
      <div>SIDEBAR</div>
      <div>------------</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

Home.displayName = 'Home';

export { Home };
