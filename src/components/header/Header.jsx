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
import { useUser } from '../../hooks/useUser';
import { useDispatch } from 'react-redux';
import { changeUsername } from '../../store/slices/userSlice';

const trigger = (
  <>
    <Image
      avatar
      spaced="right"
      src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
    />
    {/* <Icon name="angle down" size="large" /> */}
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

  return (
    <Sticky>
      <Menu
        style={{
          border: '0',
          borderRadius: '0',
          height: '68px',
          display: 'flex',
          justifyContent: 'center',
          boxShadow: '0px 1px 11px 0 #22242626',
        }}
      >
        <Menu.Menu
          style={{
            width: '150px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Menu.Item style={{ minWidth: '0' }}>
            <Image
              src={`${process.env.PUBLIC_URL}/assets/substrate-logo.png`}
              size="mini"
            />
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
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
            style={{ minWidth: '0', fontWeight: 'bold', fontSize: '1.15rem' }}
            as={'span'}
            onClick={() => dispatch(changeUsername('Malcolm Changed'))}
          >
            Malcolm
          </Menu.Item>
          {/* <Menu.Item style={{ minWidth: '0' }} as={Button}>
            <Image
              avatar
              spaced="right"
              src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
            />
            <Icon name="angle down" size="large" />
          </Menu.Item> */}
          <Menu.Item style={{ minWidth: '0' }} as={Button}>
            <DropdownTriggerExample />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Sticky>
  );
};

Header.displayName = 'Header';

export { Header };
