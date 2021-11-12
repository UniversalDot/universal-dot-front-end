import React, { useEffect, useState } from 'react';
import { Form, Grid } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';
import { TxButton } from './substrate-lib/components';

import KittyCards from './KittyCards';


// Construct a Kitty ID from storage key
const convertToKittyHash = entry =>
  `0x${entry[0].toJSON().slice(-64)}`;

// Construct a Kitty object
const constructKitty = (hash, { dna, price, gender, owner }) => ({
  id: hash,
  dna,
  price: price.toJSON(),
  gender: gender.toJSON(),
  owner: owner.toJSON()
});

// Use React hooks
export default function Kitties (props) {
  const { api, keyring } = useSubstrate();
  const { accountPair } = props;

  const [kittyHashes, setKittyHashes] = useState([]);
  const [kitties, setKitties] = useState([]);
  const [status, setStatus] = useState('');
// snip

// Subscription function for setting Kitty IDs
const subscribeKittyCnt = () => {
    let unsub = null
  
    const asyncFetch = async () => {
      // Query KittyCnt from runtime
      unsub = await api.query.substrateKitties.kittyCnt(async cnt => {
        // Fetch all Kitty objects using entries()
        const entries = await api.query.substrateKitties.kitties.entries()
        // Retrieve only the Kitty ID and set to state
        const hashes = entries.map(convertToKittyHash)
        setKittyHashes(hashes)
      })
    }
  
    asyncFetch()
  
    // return the unsubscription cleanup function
    return () => {
      unsub && unsub()
    }
  }
}