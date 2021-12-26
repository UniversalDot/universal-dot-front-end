import React from 'react';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';

import { Link, Outlet, useLocation } from 'react-router-dom';

const SidebarComponent = () => {
  const [sidebarSize, setSidebarSize] = React.useState('thin');

  const location = useLocation();

  return (
    <Sidebar.Pushable style={{ height: `calc(100vh - 68px)` }}>
      <Sidebar
        as={Menu}
        animation="push"
        icon="labeled"
        // onHide={() => setSidebarSize('very thin')}
        vertical
        visible
        width={sidebarSize}
        style={{ borderTop: '0', borderRight: '0', paddingTop: '1.5rem' }}
      >
        <Menu.Item
          style={{ minWidth: '0' }}
          as={Link}
          to="/activity"
          active={location.pathname === '/activity'}
        >
          <Icon name="home" />
        </Menu.Item>
        <Menu.Item
          style={{ minWidth: '0' }}
          as={Link}
          to="/profile"
          active={location.pathname === '/profile'}
        >
          <Icon name="gamepad" />
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher>
        <Segment basic>
          <Outlet />
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

SidebarComponent.displayName = 'SidebarComponent';

export { SidebarComponent };
