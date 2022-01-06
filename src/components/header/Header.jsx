import React from 'react';
import {
  Image,
  Sticky,
  Menu,
  Button,
  Icon,
  Search,
  Dropdown,
} from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { useDispatch } from 'react-redux';
import { changeUsername } from '../../store/slices/userSlice';
import styles from './Header.module.scss';

const trigger = (
  <>
    <Image
      avatar
      spaced="right"
      src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
    />
  </>
);

const DropdownTriggerExample = () => {
  const { username } = useUser();
  return (
    <Dropdown trigger={trigger}>
      <Dropdown.Menu style={{ top: '48px' }}>
        <Dropdown.Item
          disabled
          text={
            <span>
              Signed in as <strong>{username}</strong>
            </span>
          }
        />
        <Dropdown.Divider />
        <Dropdown.Item text="Your Profile" />
        <Dropdown.Item text="Help" />
        <Dropdown.Item icon="setting" text="Settings" />
        <Dropdown.Divider />
        <Dropdown.Item icon="log out" text="Log Out" />
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const activePage = () => {
    const current = location.pathname.split('/')[1];
    const capitalized = current.charAt(0).toUpperCase() + current.slice(1);

    return (
      <div style={{ display: 'flex' }}>
        <Icon name="block layout" />
        <span style={{ marginLeft: '0.85rem', fontWeight: 'bold' }}>
          {capitalized}
        </span>
      </div>
    );
  };

  return (
    <Sticky className={styles.header}>
      <div className={styles.contentContainer}>
        <div
          className={styles.logoContainer}
          style={{
            width: '150px',
          }}
        >
          <Image
            src={`${process.env.PUBLIC_URL}/assets/substrate-logo.png`}
            size="mini"
          />
        </div>
        <div
          className={styles.mainContent}
          style={{
            width: 'calc(100% - 150px)',
            // 300px = 150px of minWidth of activyPage item + sidebar
            paddingRight: '300px',
          }}
        >
          <Menu className={styles.menu}>
            <Menu.Menu>
              <Menu.Item className={styles.menuItem_activePage} as={'span'}>
                {activePage()}
              </Menu.Item>
            </Menu.Menu>
            <Menu.Menu>
              <Menu.Item style={{ minWidth: '0' }} as={Button}>
                <Search />
              </Menu.Item>
              <Menu.Item style={{ minWidth: '0' }} as={Button}>
                <Icon name="bell outline" />
              </Menu.Item>
              <Menu.Item style={{ minWidth: '0' }} as={Button}>
                <Icon name="setting" />
              </Menu.Item>
              <Menu.Item style={{ minWidth: '0' }} as={Button}>
                <Icon name="folder outline" />
              </Menu.Item>
              <Menu.Item
                className={styles.menuItem_username}
                as={'span'}
                onClick={() => dispatch(changeUsername('Malcolm Changed'))}
              >
                Malcolm
              </Menu.Item>
              <Menu.Item style={{ minWidth: '0' }} as={Button}>
                <DropdownTriggerExample />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </div>
      </div>
    </Sticky>
  );
};

Header.displayName = 'Header';

export { Header };
