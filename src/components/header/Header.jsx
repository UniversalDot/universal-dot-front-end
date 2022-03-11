import React, { useEffect } from 'react';
import {
  Image,
  Sticky,
  Menu,
  Button,
  Icon,
  Search,
  Dropdown,
} from 'semantic-ui-react';
import { useLocation, Link } from 'react-router-dom';
import { useUser, useGeneral } from '../../hooks';
import styles from './Header.module.scss';
import { useSubstrate } from '../../substrate-lib';

const Header = () => {
  const location = useLocation();
  const { keyring } = useSubstrate();

  const {
    setKeyringOptions,
    keyringOptions,
    setSelectedKeyring,
    selectedKeyring,
  } = useUser();
  const { sidebarWidth } = useGeneral();

  const activePage = () => {
    const current = location.pathname.split('/')[1];
    const capitalized = current.charAt(0).toUpperCase() + current.slice(1);

    let icon;
    switch (current) {
      case 'profile':
        icon = 'block layout';
        break;
      case 'dashboard':
        icon = 'briefcase';
        break;
      case 'organization':
        icon = 'clipboard list';
        break;
      case 'calendar':
        icon = 'calendar alternate outline';
        break;
      default:
        icon = '';
    }

    return (
      <div style={{ display: 'flex' }}>
        <Icon name={icon} />
        <span style={{ marginLeft: '0.85rem', fontWeight: 'bold' }}>
          {capitalized}
        </span>
      </div>
    );
  };

  const AccountDropdown = () => {
    const trigger = (
      <>
        <Image
          avatar
          spaced="right"
          src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
        />
      </>
    );

    return (
      <Dropdown trigger={trigger}>
        <Dropdown.Menu style={{ top: '48px' }}>
          <Dropdown.Item
            disabled
            text={
              <span>
                Signed in as <strong>{selectedKeyring.text}</strong>
              </span>
            }
          />
          <Dropdown.Divider />

          <Dropdown.Item text="Your Profile" as={Link} to="profile/configure" />
          <Dropdown.Item text="Help" />
          <Dropdown.Item icon="setting" text="Settings" />
          <Dropdown.Divider />
          <Dropdown.Item icon="log out" text="Log Out" />
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  useEffect(() => {
    // Get the list of accounts we possess the private key for.
    if (keyring) {
      const keyringOptions = keyring?.getPairs()?.map(account => ({
        key: account.address,
        value: account.address,
        text: account.meta.name.toUpperCase(),
      }));
      setKeyringOptions(keyringOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyring]);

  return (
    <Sticky className={styles.header}>
      <div className={styles.contentContainer}>
        <div
          className={styles.logoContainer}
          style={{
            width: `${sidebarWidth}px`,
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
            width: `calc(100% - ${sidebarWidth}px)`,
            // paddingRight = px of minWidth of activyPage item + sidebar
            paddingRight: `${sidebarWidth + sidebarWidth}px`,
          }}
        >
          <Menu className={styles.menu}>
            <Menu.Menu>
              <Menu.Item
                className={styles.menuItem_activePage}
                as={'span'}
                style={{ minWidth: `${sidebarWidth}px` }}
              >
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
              <Menu.Item style={{ minWidth: '0' }}>
                <Dropdown
                  placeholder="Select an account"
                  selection
                  options={keyringOptions || []}
                  onChange={(_, otherData) => {
                    setSelectedKeyring({
                      key: otherData.value,
                      value: otherData.value,
                      text: keyringOptions.find(
                        option => option.key === otherData.value
                      ).text,
                    });
                  }}
                  value={selectedKeyring.value || ''}
                />
              </Menu.Item>
              <Menu.Item style={{ minWidth: '0' }} as={Button}>
                <AccountDropdown />
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
