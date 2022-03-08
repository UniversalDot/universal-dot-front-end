/* eslint-disable multiline-ternary */
import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Icon, Card, Button, Input } from 'semantic-ui-react';
import styles from './Organizations.module.scss';
import { Project, Modal } from '..';
import { useUser } from '../../hooks/useUser';
import { useDao } from '../../hooks/useDao';
import { daoCallables, statusTypes } from '../../types';
import { useStatus } from '../../hooks/useStatus';

const Organizations = () => {
  const [open, setOpen] = useState(false);
  const [visionActionType, setVisionActionType] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const { status, setStatus } = useStatus();

  const { selectedAccountKey } = useUser();
  const {
    getJoinedOrganizations,
    getTotalOrganizations,
    getTotalVisions,
    getSuggestedVisions,
    totalOrganizations,
    totalVisions,
    joinedOrganizations,
    suggestedVisions,
    actionLoading,
    daoAction,
    setVisionName,
    visionNameForAction,
  } = useDao();

  useEffect(() => {
    if (selectedAccountKey) {
      // const handleResponse = dataFromResponse =>
      //   !dataFromResponse.isNone &&
      //   setData({ taskId: id, ...dataFromResponse.toHuman() });
      console.log('selectedAccountKey in org', selectedAccountKey);

      getJoinedOrganizations(selectedAccountKey, daoCallables.MEMBER_OF);
      getTotalOrganizations(daoCallables.ORGANIZATION_COUNT);
      getTotalVisions(daoCallables.VISION_COUNT);
      getSuggestedVisions(selectedAccountKey, daoCallables.VISION);
    }
  }, [
    selectedAccountKey,
    getJoinedOrganizations,
    getTotalOrganizations,
    getTotalVisions,
    getSuggestedVisions,
  ]);

  const handleClose = useCallback(() => setOpen(false), []);

  const visionButtonClick = useCallback(visionActionType => {
    setVisionActionType(visionActionType);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!!status && status === statusTypes.INIT) {
      setShowLoader(true);
    }

    if (!!status && status === statusTypes.IN_BLOCK) {
      setShowLoader(false);
      handleClose();
      setTimeout(() => {
        setStatus('');
      }, 5000);
    }
  }, [status, setStatus, handleClose]);

  return (
    <>
      <Grid className={styles.gridStats}>
        <Grid.Row className={styles.row}>
          <Grid.Column
            className={styles.column}
            mobile={16}
            tablet={16}
            computer={8}
          >
            <Card fluid raised color="purple" className={styles.card}>
              <Card.Content className={styles.contentContainer}>
                <div className={styles.header}>
                  <span className={styles.text}>Total organizations</span>
                  <Button basic className={styles.button}>
                    Details
                  </Button>
                </div>
                <Card.Description className={styles.description}>
                  {totalOrganizations}
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column
            className={styles.column}
            mobile={16}
            tablet={16}
            computer={8}
          >
            <Card fluid raised color="pink" className={styles.card}>
              <Card.Content className={styles.contentContainer}>
                <div className={styles.header}>
                  <span className={styles.text}>Total visions</span>
                  <Button basic className={styles.button}>
                    Details
                  </Button>
                </div>
                <Card.Description className={styles.description}>
                  {totalVisions}
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid className={styles.grid} columns={3} stackable>
        <Grid.Row className={styles.row}>
          <Grid.Column className={styles.column}>
            <div className={styles.section}>
              <div className={styles.contentContainer}>
                <div className={styles.header}>
                  <span className={styles.text}>
                    <Icon name="folder outline" className={styles.icon} />
                    Joined organizations
                  </span>
                </div>
                <div className={styles.body}>
                  {joinedOrganizations.map(org => (
                    <Project
                      key={org}
                      title={org}
                      description="Lorem ipsum..."
                    />
                  ))}
                </div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column className={styles.column}>
            <div className={styles.section}>
              <div className={styles.contentContainer}>
                <div className={styles.header}>
                  <span className={styles.text}>
                    <Icon name="folder outline" className={styles.icon} />
                    Suggested visions
                  </span>
                </div>
                <div className={styles.body}>
                  {suggestedVisions.map(suggVis => (
                    <Project
                      key={suggVis}
                      title={suggVis.substring(0, 12) + '...'}
                      description="Lorem ipsum..."
                    />
                  ))}
                  <div className={styles.visionButtons}>
                    <Button
                      color="green"
                      type="submit"
                      onClick={() => visionButtonClick('sign')}
                      // loading={loading}
                      // disabled={loading}
                    >
                      Sign vision
                    </Button>
                    <Button
                      icon="minus"
                      color="orange"
                      onClick={() => visionButtonClick('unsign')}
                      // loading={loading}
                      // disabled={loading}
                    >
                      Unsign vision
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        title={visionActionType === 'sign' ? 'Sign vision' : 'Unsign Vision'}
        description="Enter an organization's vision name below."
        loading={actionLoading || showLoader}
        actionButtonLabel={
          visionActionType === 'sign' ? 'Sign vision' : 'Unsign vision'
        }
        actionButtonColor="blue"
        actionButtonOnClick={() =>
          daoAction(
            visionActionType === 'sign'
              ? daoCallables.SIGN_VISION
              : daoCallables.UNSIGN_VISION,
            visionNameForAction
          )
        }
        showRemoveButton={false}
      >
        <Grid className={styles.gridContainer}>
          <Grid.Row>
            <Grid.Column>
              <Input
                placeholder="Enter an organization's vision name..."
                fluid
                type="text"
                label="Vision name:"
                value={visionNameForAction || ''}
                onChange={e => setVisionName(e.target.value)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal>
    </>
  );
};

Organizations.displayName = 'Organizations';

export { Organizations };
