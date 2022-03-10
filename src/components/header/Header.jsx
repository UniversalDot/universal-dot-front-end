import React, { useEffect, useState } from 'react';
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
import { useUser } from '../../hooks/useUser';
import { useGeneral } from '../../hooks/useGeneral';
import styles from './Header.module.scss';

import { useSubstrate } from '../../substrate-lib';
import { useDispatch } from 'react-redux';
import { setAccountSelected } from '../../store/slices/accountSlice';

const Header = () => {
  const location = useLocation();
  const { selectedAccountUsername } = useUser();
  const { sidebarWidth } = useGeneral();

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

  const AccountDropdown = () => {
    const { selectedAccountUsername } = useUser();

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
                Signed in as <strong>{selectedAccountUsername}</strong>
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

  // const friendOptions = [
  //   {
  //     key: 'Jenny Hess',
  //     text: 'Jenny Hess',
  //     value: 'Jenny Hess',
  //   },
  // ];

  const [allAccountOptions, setAllAccountOptions] = useState([]);

  const dispatch = useDispatch();
  const { keyring } = useSubstrate();

  const [keyringOptions, setKeyringOptions] = useState(undefined);

  // Initial username
  const [initialUsername, setInitialUsername] = useState('');
  // Initial account key
  const [initialAddress, setInitialAddress] = useState('');

  useEffect(() => {
    if (keyringOptions) {
      console.log('keyringOptions', keyringOptions);
      setAllAccountOptions(
        keyringOptions.map(option => {
          return {
            key: option.text,
            text: option.text,
            value: option.value,
          };
        })
      );
      setInitialUsername(
        keyringOptions?.length > 0 ? keyringOptions[1].text : ''
      );
      setInitialAddress(
        keyringOptions?.length > 0 ? keyringOptions[1].value : ''
      );
    }
  }, [keyringOptions]);

  useEffect(() => {
    // Get the list of accounts we possess the private key for
    if (keyring) {
      const keyringOptionsToSet = keyring?.getPairs()?.map(account => ({
        key: account.address,
        value: account.address,
        text: account.meta.name.toUpperCase(),
        icon: 'user',
      }));
      setKeyringOptions(keyringOptionsToSet);
    }
  }, [keyring]);

  // Set the initial address
  useEffect(() => {
    dispatch(
      setAccountSelected({
        selectedAccountKey: initialAddress,
        selectedAccountUsername: initialUsername,
      })
    );
  }, [dispatch, keyring, initialAddress, initialUsername]);

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
            // 300px = 150px of minWidth of activyPage item + sidebar
            // paddingRight: '300px',
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
              {/* <Menu.Item className={styles.menuItem_username} as={'span'}>
                {selectedAccountUsername}
              </Menu.Item> */}
              <Menu.Item style={{ minWidth: '0' }}>
                <Dropdown
                  placeholder="Select an account"
                  fluid
                  selection
                  options={allAccountOptions}
                  onChange={(_, otherData) =>
                    dispatch(
                      setAccountSelected({
                        selectedAccountKey: otherData.value,
                        selectedAccountUsername: 'testtt',
                      })
                    )
                  }
                  value="fawfawf"
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
