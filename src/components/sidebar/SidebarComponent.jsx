import React from 'react';
import { Icon, Menu, Segment, Sidebar, Label } from 'semantic-ui-react';

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
          className="menu-item-custom"
        >
          <div style={{ display: 'flex' }}>
            <Icon name="block layout" />
            <span style={{ marginLeft: '0.85rem' }}>Activity</span>
          </div>
        </Menu.Item>
        <Menu.Item
          style={{ minWidth: '0' }}
          as={Link}
          to="/dashboard"
          active={location.pathname === '/dashboard'}
        >
          <div style={{ display: 'flex' }}>
            <Icon name="briefcase" />
            <span style={{ marginLeft: '0.85rem' }}>Dashboard</span>
          </div>
        </Menu.Item>
        <Menu.Item
          style={{ minWidth: '0' }}
          as={Link}
          to="/tasks"
          active={location.pathname === '/tasks'}
        >
          <div style={{ display: 'flex' }}>
            <Icon name="tasks" />
            <span style={{ marginLeft: '0.85rem' }}>Tasks</span>
            <Icon style={{ marginLeft: '0.85rem' }} name="caret down" />
          </div>
        </Menu.Item>
        {location.pathname.includes('/tasks') && (
          <Menu.Item
            style={{ minWidth: '0', paddingLeft: '2rem' }}
            as={Link}
            to="/tasks/developing"
            active={location.pathname === '/tasks/developing'}
          >
            <div style={{ display: 'flex' }}>
              <Icon name="tasks" />
              <span style={{ marginLeft: '0.85rem' }}>Developing</span>
            </div>
          </Menu.Item>
        )}
        {location.pathname.includes('/tasks') && (
          <Menu.Item
            style={{ minWidth: '0', paddingLeft: '2rem' }}
            as={Link}
            to="/tasks/designing"
            active={location.pathname === '/tasks/designing'}
          >
            <div style={{ display: 'flex' }}>
              <Icon name="tasks" />
              <span style={{ marginLeft: '0.85rem' }}>Designing</span>
            </div>
          </Menu.Item>
        )}
        <Menu.Item
          style={{ minWidth: '0' }}
          as={Link}
          to="/organizer"
          active={location.pathname === '/organizer'}
        >
          <div style={{ display: 'flex' }}>
            <Icon name="clipboard list" />
            <span style={{ marginLeft: '0.85rem' }}>Organizer</span>
          </div>
        </Menu.Item>
        <Menu.Item
          style={{ minWidth: '0' }}
          as={Link}
          to="/calendar"
          active={location.pathname === '/calendar'}
        >
          <div style={{ display: 'flex' }}>
            <Icon name="calendar alternate outline" />
            <span style={{ marginLeft: '0.85rem' }}>Calendar</span>
          </div>
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
