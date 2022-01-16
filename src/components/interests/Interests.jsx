import React, { useState } from 'react';
import { Card, Search, Label, Input, Button, Icon } from 'semantic-ui-react';
import styles from './Interests.module.scss';
import { useUser } from '../../hooks/useUser';
import { useSubstrate } from '../../substrate-lib';
import { web3FromSource } from '@polkadot/extension-dapp';
import utils from '../../substrate-lib/utils';
import { Events } from '../';

const Interests = () => {
  const [oneInterest, setOneInterest] = useState('');
  const [allInterests, setAllInterests] = useState([]);
  const [status, setStatus] = useState('none');

  const { selectedAccountKey } = useUser();
  const { api, keyring, keyringState } = useSubstrate();
  const [unsub, setUnsub] = useState(null);

  const callable = 'createProfile';

  const callableRemoveProfile = 'removeProfile';
  const callableUpdateProfile = 'updateProfile';

  const palletRpc = 'profile';

  const cols = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1,
  ];
  const cols2 = [1, 1, 1, 1, 1, 1];
  const columns = cols.map((_, i) => (
    <Label basic color="blue" style={{ margin: '0.5rem' }} key={i}>
      Blue
    </Label>
  ));

  const columns2 = cols2.map((_, i) => (
    <Label basic color="grey" style={{ margin: '0.5rem' }} key={i}>
      Blue
    </Label>
  ));

  const onPalletCallableParamChange = e => {
    setOneInterest(e.target.value);
  };

  const TxButton = ({ label, color = 'blue', type }) => {
    const signedTx = async () => {
      // if (typeof unsub === 'function') {
      //   unsub();
      //   setUnsub(null);
      // }

      const accountPair =
        selectedAccountKey &&
        keyringState === 'READY' &&
        keyring.getPair(selectedAccountKey);

      const getFromAcct = async () => {
        const {
          address,
          meta: { source, isInjected },
        } = accountPair;
        let fromAcct;

        // signer is from Polkadot-js browser extension
        if (isInjected) {
          const injected = await web3FromSource(source);
          fromAcct = address;
          api.setSigner(injected.signer);
        } else {
          fromAcct = accountPair;
        }

        return fromAcct;
      };

      const transformParams = (
        paramFields,
        inputParams,
        opts = { emptyAsNull: true }
      ) => {
        const isNumType = type =>
          utils.paramConversion.num.some(el => type.indexOf(el) >= 0);
        // if `opts.emptyAsNull` is true, empty param value will be added to res as `null`.
        //   Otherwise, it will not be added
        const paramVal = inputParams.map(inputParam => {
          // To cater the js quirk that `null` is a type of `object`.
          if (
            typeof inputParam === 'object' &&
            inputParam !== null &&
            typeof inputParam.value === 'string'
          ) {
            return inputParam.value.trim();
          } else if (typeof inputParam === 'string') {
            return inputParam.trim();
          }
          return inputParam;
        });
        const params = paramFields.map((field, ind) => ({
          ...field,
          value: paramVal[ind] || null,
        }));

        return params.reduce((memo, { type = 'string', value }) => {
          if (value == null || value === '') {
            return opts.emptyAsNull ? [...memo, null] : memo;
          }

          let converted = value;

          // Deal with a vector
          if (type.indexOf('Vec<') >= 0) {
            converted = converted.split(',').map(e => e.trim());
            converted = converted.map(single =>
              isNumType(type)
                ? single.indexOf('.') >= 0
                  ? Number.parseFloat(single)
                  : Number.parseInt(single)
                : single
            );
            return [...memo, converted];
          }

          // Deal with a single value
          if (isNumType(type)) {
            converted =
              converted.indexOf('.') >= 0
                ? Number.parseFloat(converted)
                : Number.parseInt(converted);
          }
          return [...memo, converted];
        }, []);
      };

      const txResHandler = ({ status }) => {
        const callStatus = status;

        callStatus?.isFinalized
          ? setStatus(
              `😉 Finalized. Block hash: ${callStatus?.asFinalized?.toString()}`
            )
          : setStatus(`Current transaction status: ${callStatus?.type}`);
      };

      const txErrHandler = err =>
        setStatus(`😞 Transaction Failed: ${err.toString()}`);

      const paramFieldsPreparedForTransformed = () => [
        { name: 'interests', optional: false, type: 'Bytes' },
      ];
      const inputParamsPreparedForTransformed = () => [
        { type: 'Bytes', value: allInterests.join() },
      ];

      // Tuka dole e funkcijata, a gore se helperite;

      const fromAcct = await getFromAcct();
      const transformed = transformParams(
        paramFieldsPreparedForTransformed(),
        inputParamsPreparedForTransformed()
      );
      // transformed can be empty parameters

      console.log('transformed', transformed);

      let txExecute;

      if (type === 'CREATE') {
        txExecute = transformed
          ? api.tx[palletRpc][callable](...transformed)
          : api.tx[palletRpc][callable]();
      }
      if (type === 'REMOVE') {
        txExecute = api.tx[palletRpc][callableRemoveProfile]();
      }

      if (type === 'UPDATE') {
        const mockUpdateDataForNow = ['mockData, mockTest'];
        txExecute = transformed
          ? api.tx[palletRpc][callableUpdateProfile](...mockUpdateDataForNow)
          : api.tx[palletRpc][callableUpdateProfile]();
      }

      console.log('txExecute', txExecute);

      const unsubbbb = await txExecute
        .signAndSend(fromAcct, txResHandler)
        .catch(txErrHandler);

      console.log('unsubbbb  txExecute async call', unsubbbb);

      setUnsub(() => unsubbbb);
    };

    const transaction = async () => {
      if (typeof unsub === 'function') {
        unsub();
        setUnsub(null);
      }

      setStatus('Sending...');

      signedTx();
    };

    return (
      <Button
        basic
        color={color}
        type="submit"
        onClick={transaction}
        disabled={false}
      >
        {label}
      </Button>
    );
  };

  const TxButtonQuery = ({ label, color = 'blue', type }) => {
    if (typeof unsub === 'function') {
      unsub();
      setUnsub(null);
    }

    const transformParams = (
      paramFields,
      inputParams,
      opts = { emptyAsNull: true }
    ) => {
      const isNumType = type =>
        utils.paramConversion.num.some(el => type.indexOf(el) >= 0);
      // if `opts.emptyAsNull` is true, empty param value will be added to res as `null`.
      //   Otherwise, it will not be added
      const paramVal = inputParams.map(inputParam => {
        // To cater the js quirk that `null` is a type of `object`.
        if (
          typeof inputParam === 'object' &&
          inputParam !== null &&
          typeof inputParam.value === 'string'
        ) {
          return inputParam.value.trim();
        } else if (typeof inputParam === 'string') {
          return inputParam.trim();
        }
        return inputParam;
      });
      const params = paramFields.map((field, ind) => ({
        ...field,
        value: paramVal[ind] || null,
      }));

      return params.reduce((memo, { type = 'string', value }) => {
        if (value == null || value === '') {
          return opts.emptyAsNull ? [...memo, null] : memo;
        }

        let converted = value;

        // Deal with a vector
        if (type.indexOf('Vec<') >= 0) {
          converted = converted.split(',').map(e => e.trim());
          converted = converted.map(single =>
            isNumType(type)
              ? single.indexOf('.') >= 0
                ? Number.parseFloat(single)
                : Number.parseInt(single)
              : single
          );
          return [...memo, converted];
        }

        // Deal with a single value
        if (isNumType(type)) {
          converted =
            converted.indexOf('.') >= 0
              ? Number.parseFloat(converted)
              : Number.parseInt(converted);
        }
        return [...memo, converted];
      }, []);
    };

    const query = async () => {
      const paramFieldsss = [
        {
          name: '0',
          type: '0',
          optional: false,
        },
      ];

      const inputParamss = [
        {
          type: '0',
          value: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        },
      ];

      const transformed = transformParams(paramFieldsss, inputParamss);

      const queryResHandler = result =>
        result.isNone ? setStatus('None') : setStatus(result.toString());

      const unsubbbb = await api.query[palletRpc]['profiles'](
        ...transformed,
        queryResHandler
      );

      console.log('unsubbbb', unsubbbb);
      setUnsub(() => unsubbbb);
    };

    return (
      <Button
        basic
        color={'yellow'}
        type="submit"
        onClick={query}
        disabled={false}
      >
        {label}
      </Button>
    );
  };

  const handleAddInterest = () => {
    if (oneInterest.length > 3) {
      setAllInterests([...allInterests, oneInterest]);
      setOneInterest('');
    }
  };

  const handleRemoveInterest = interest => {
    setAllInterests(
      allInterests.filter(interestItem => interestItem !== interest)
    );
  };

  return (
    <Card fluid raised className={styles.card}>
      <Card.Content>
        <div>
          <Label>This is for testing create profile:</Label>
          <Input
            placeholder="Write your interest"
            fluid
            type="text"
            label="Interest"
            // state={{ ind, paramField }}
            value={oneInterest || ''}
            onChange={e => onPalletCallableParamChange(e)}
            style={{ padding: '1rem 0' }}
          />
          <div style={{ marginBottom: '1rem' }}>
            <Button onClick={handleAddInterest}>Add interest</Button>
          </div>
          <TxButton label="Create profile" color="blue" type="CREATE" />
          <TxButton label="Remove profile" color="red" type="REMOVE" />
          <TxButton label="Update profile" color="green" type="UPDATE" />
          <div style={{ margin: '1rem 0' }}>
            <Label>Status:</Label>
            <Label>{status}</Label>
          </div>
        </div>
        {/* <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            flexDirection: 'column',
            height: '80px',
            justifyContent: 'space-between',
          }}
        >
          <Label>This is for testing query profile:</Label>
          <TxButtonQuery
            label="Get query for profile"
            type="QUERY"
            color="blue"
          />
          <Label>{status}</Label>
        </div> */}
        <Search className={styles.search} />
        <div className={styles.pills}>
          <Label>These are the interests you selected:</Label>
          <div className={styles.selected}>
            {allInterests.map((interest, i) => (
              <Label
                basic
                color="blue"
                style={{ margin: '0.5rem' }}
                key={`${interest}+${i}`}
              >
                {interest}
                <Icon
                  name="delete"
                  onClick={() => handleRemoveInterest(interest)}
                />
              </Label>
            ))}
          </div>
          {/* <div className={styles.selected}>{columns2}</div> */}
          {/* <div className={styles.options}>{columns}</div> */}
        </div>
        <div style={{ margin: '2rem 0' }}>
          <Events />
        </div>
      </Card.Content>
    </Card>
  );
};

Interests.displayName = 'Interests';

export { Interests };
