import React, { useEffect, useState } from 'react';
import { SidebarComponent } from '../../components';
import { useSubstrate } from '../../substrate-lib';
import { useDispatch } from 'react-redux';
import { setAccountSelected } from '../../store/slices/accountSlice';

const Layout = () => {
  const dispatch = useDispatch();
  const { keyring } = useSubstrate();

  // const [accountAddress, setAccountAddress] = useState('');
  // const [accountSelected, setAccountSelected] = useState('');

  // Get the list of accounts we possess the private key for
  const keyringOptions = keyring?.getPairs()?.map(account => ({
    key: account.address,
    value: account.address,
    text: account.meta.name.toUpperCase(),
    icon: 'user',
  }));
  console.log('keyringOptions', keyringOptions);

  // Initial username
  const initialUsername =
    keyringOptions?.length > 0 ? keyringOptions[0].text : '';

  // Initial account key
  const initialAddress =
    keyringOptions?.length > 0 ? keyringOptions[0].value : '';

  // Set the initial address
  useEffect(() => {
    // setAccountAddress(initialAddress);
    // setAccountSelected(initialUsername);
    dispatch(
      setAccountSelected({
        selectedAccountKey: initialAddress,
        selectedAccountUsername: initialUsername,
      })
    );
  }, [initialAddress, initialUsername, dispatch]);

  return (
    <>
      <SidebarComponent />
    </>
  );
};

Layout.displayName = 'Layout';

export { Layout };
