import React, { useEffect, useState } from 'react';
import { SidebarComponent } from '../../components';
import { useSubstrate } from '../../substrate-lib';
import { useDispatch } from 'react-redux';
import { setAccountSelected } from '../../store/slices/accountSlice';

const Layout = () => {
  const dispatch = useDispatch();
  const { keyring } = useSubstrate();

  const [keyringOptions, setKeyringOptions] = useState(undefined);

  // Initial username
  const [initialUsername, setInitialUsername] = useState('');
  // Initial account key
  const [initialAddress, setInitialAddress] = useState('');

  useEffect(() => {
    if (keyringOptions) {
      setInitialUsername(
        keyringOptions?.length > 0 ? keyringOptions[1].text : ''
      );
      setInitialAddress(
        keyringOptions?.length > 0 ? keyringOptions[1].value : ''
      );
      console.log('keyRingOptions', keyringOptions);
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
    <>
      <SidebarComponent />
    </>
  );
};

Layout.displayName = 'Layout';

export { Layout };
