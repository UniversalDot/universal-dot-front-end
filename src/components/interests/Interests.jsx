import React, { useState } from 'react';
import { Card, Search, Label, Input, Button } from 'semantic-ui-react';
import styles from './Interests.module.scss';
import { useUser } from '../../hooks/useUser';
import { useSubstrate } from '../../substrate-lib';
import { web3FromSource } from '@polkadot/extension-dapp';
import utils from '../../substrate-lib/utils';

const Interests = () => {
  const [oneInterest, setOneInterest] = useState('');
  const [status, setStatus] = useState('nothing yet....');

  const { selectedAccountKey } = useUser();
  const { api, keyring, keyringState } = useSubstrate();
  const [unsub, setUnsub] = useState(null);

  const callable = 'createProfile';

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
    const transaction = async () => {
      if (typeof unsub === 'function') {
        unsub();
        setUnsub(null);
      }

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

      const fromAcct = await getFromAcct();
      const transformed = transformParams(['test bob 123'], ['bobbb 123']);
      // const transformed = oneInterest || 'testinggggg';
      // transformed can be empty parameters

      console.log('transformed', transformed);

      const txExecute = transformed
        ? api.tx[palletRpc][callable](transformed)
        : api.tx[palletRpc][callable]();

      const unsubbbb = await txExecute
        .signAndSend(fromAcct, () =>
          console.log(
            'txResHandler, we should probably set some status here...'
          )
        )
        .catch(() => console.log('this is an error handler'));
      setUnsub(() => unsubbbb);
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

  return (
    <Card fluid raised className={styles.card}>
      <Card.Content>
        <div>
          <Label>This is for testing create profile:</Label>
          <Input
            placeholder="placeholder"
            fluid
            type="text"
            label="label"
            // state={{ ind, paramField }}
            value={oneInterest || ''}
            onChange={e => onPalletCallableParamChange(e)}
            style={{ padding: '1rem 0' }}
          />
          <TxButton label="Create profile" type="SIGNED-TX" color="blue" />
        </div>
        <div
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
        </div>
        <Search className={styles.search} />
        <div className={styles.pills}>
          <div className={styles.selected}>{columns2}</div>
          <div className={styles.options}>{columns}</div>
        </div>
      </Card.Content>
    </Card>
  );
};

Interests.displayName = 'Interests';

export { Interests };
