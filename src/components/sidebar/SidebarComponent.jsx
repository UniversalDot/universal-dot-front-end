import React, { useEffect } from 'react';
import { Icon, Menu, Sidebar, Container } from 'semantic-ui-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './SidebarComponent.module.scss';

const SidebarComponent = () => {
  const [sidebarSize, setSidebarSize] = React.useState('thin');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/profile');
    }
  }, [location, navigate]);

  return (
    <Sidebar.Pushable
      className={styles.sidebarComponent}
      style={{ height: 'calc(100vh - 68px)' }}
    >
      <Sidebar
        as={Menu}
        animation="push"
        icon="labeled"
        // onHide={() => setSidebarSize('very thin')}
        vertical
        visible
        width={sidebarSize}
        className={styles.sidebar}
      >
        <Menu.Item
          as={Link}
          to="/profile"
          active={location.pathname.split('/').includes('profile')}
          className={styles.menuItem_first}
        >
          <div className={styles.menuItem_content}>
            <Icon name="block layout" />
            <span className={styles.menuItem_content_text}>Profile</span>
          </div>
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/dashboard"
          active={location.pathname === '/dashboard'}
        >
          <div className={styles.menuItem_content}>
            <Icon name="briefcase" />
            <span className={styles.menuItem_content_text}>Dashboard</span>
          </div>
        </Menu.Item>
        {/* <Menu.Item
          as={Link}
          to="/tasks"
          active={location.pathname === '/tasks'}
        >
          <div className={styles.menuItem_content}>
            <Icon name="tasks" />
            <span className={styles.menuItem_content_text}>Tasks</span>
            <Icon style={{ marginLeft: '0.85rem' }} name="caret down" />
          </div>
        </Menu.Item> */}
        {/* {location.pathname.includes('/tasks') && (
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
        )} */}
        <Menu.Item
          as={Link}
          to="/organization"
          active={location.pathname === '/organization'}
        >
          <div className={styles.menuItem_content}>
            <Icon name="clipboard list" />
            <span className={styles.menuItem_content_text}>Organization</span>
          </div>
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/calendar"
          active={location.pathname === '/calendar'}
        >
          <div className={styles.menuItem_content}>
            <Icon name="calendar alternate outline" />
            <span className={styles.menuItem_content_text}>Calendar</span>
          </div>
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher
        style={{ width: 'calc(100% - 150px)' }}
        className={styles.sidebarContent}
      >
        <Container fluid className={styles.contentContainer}>
          <Outlet />
        </Container>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

SidebarComponent.displayName = 'SidebarComponent';

export { SidebarComponent };
