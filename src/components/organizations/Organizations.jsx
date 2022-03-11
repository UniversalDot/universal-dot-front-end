/* eslint-disable multiline-ternary */
import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Icon, Card, Button, Input } from 'semantic-ui-react';
import styles from './Organizations.module.scss';
import { Project, Modal } from '..';
import { useUser, useDao, useStatus } from '../../hooks';
import { daoCallables, statusTypes } from '../../types';

const Organizations = ({ type }) => {
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const [modalTitle, setModalTitle] = useState('');
  const [daoType, setDaoType] = useState('');

  const { status, setStatus } = useStatus();

  const { selectedKeyring } = useUser();
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
    organizationNameForAction,
    memberOrTaskForAction,
    setOrganizationName,
    setMemberOrTask,
    getApplicants,
    allApplicants,
    resetFields,
  } = useDao();

  const [searchOrg, setSearchOrg] = useState('');

  const visionNameTypes = [
    daoCallables.SIGN_VISION,
    daoCallables.UNSIGN_VISION,
    daoCallables.CREATE_VISION,
    daoCallables.REMOVE_VISION,
  ];
  const orgNameTypes = [
    daoCallables.CREATE_ORGANIZATION,
    daoCallables.DISSOLVE_ORGANIZATION,
    daoCallables.ADD_MEMBERS,
    daoCallables.REMOVE_MEMBERS,
    daoCallables.ADD_TASKS,
    daoCallables.REMOVE_TASKS,
  ];
  const memberAndTaskTypes = [
    daoCallables.ADD_MEMBERS,
    daoCallables.REMOVE_MEMBERS,
    daoCallables.ADD_TASKS,
    daoCallables.REMOVE_TASKS,
  ];
  const taskTypes = [daoCallables.ADD_TASKS, daoCallables.REMOVE_TASKS];

  useEffect(() => {
    if (actionType) {
      let title = '';
      let daoType = '';
      switch (actionType) {
        case 'joined_sign':
          title = 'Sign vision';
          daoType = daoCallables.SIGN_VISION;
          break;
        case 'joined_unsign':
          title = 'Unsign vision';
          daoType = daoCallables.UNSIGN_VISION;
          break;
        case 'own_createVision':
          title = 'Create vision';
          daoType = daoCallables.CREATE_VISION;
          break;
        case 'own_createOrganization':
          title = 'Create organization';
          daoType = daoCallables.CREATE_ORGANIZATION;
          break;
        case 'own_addMember':
          title = 'Add member';
          daoType = daoCallables.ADD_MEMBERS;
          break;
        case 'own_addTask':
          title = 'Add task';
          daoType = daoCallables.ADD_TASKS;
          break;
        case 'own_removeVision':
          title = 'Remove vision';
          daoType = daoCallables.REMOVE_VISION;
          break;
        case 'own_dissolveOrganization':
          title = 'Dissolve organization';
          daoType = daoCallables.DISSOLVE_ORGANIZATION;
          break;
        case 'own_removeMembers':
          title = 'Remove members';
          daoType = daoCallables.REMOVE_MEMBERS;
          break;
        case 'own_removeTask':
          title = 'Remove task';
          daoType = daoCallables.REMOVE_TASKS;
          break;
        default:
      }
      setModalTitle(title);
      setDaoType(daoType);
    }
  }, [actionType]);

  useEffect(() => {
    if (selectedKeyring.value) {
      getJoinedOrganizations(selectedKeyring.value, daoCallables.MEMBER_OF);
      getTotalOrganizations(daoCallables.ORGANIZATION_COUNT);
      getTotalVisions(daoCallables.VISION_COUNT);
      getSuggestedVisions(selectedKeyring.value, daoCallables.VISION);
    }
  }, [
    selectedKeyring.value,
    getJoinedOrganizations,
    getTotalOrganizations,
    getTotalVisions,
    getSuggestedVisions,
  ]);

  const handleClose = useCallback(() => setOpen(false), []);

  const handleTopInputOnChange = useCallback(
    (inputType, value) => {
      switch (inputType) {
        case daoCallables.SIGN_VISION:
        case daoCallables.UNSIGN_VISION:
        case daoCallables.CREATE_VISION:
        case daoCallables.REMOVE_VISION:
          setVisionName(value);
          break;
        case daoCallables.CREATE_ORGANIZATION:
        case daoCallables.DISSOLVE_ORGANIZATION:
        case daoCallables.ADD_MEMBERS:
        case daoCallables.ADD_TASKS:
        case daoCallables.REMOVE_MEMBERS:
        case daoCallables.REMOVE_TASKS:
          setOrganizationName(value);
          break;
        case 'memberOrTask':
          setMemberOrTask(value);
          break;
        default:
      }
    },
    [setMemberOrTask, setVisionName, setOrganizationName]
  );

  const handleBottomInputOnChange = useCallback(
    (inputType, value) => {
      switch (inputType) {
        case daoCallables.CREATE_ORGANIZATION:
        case daoCallables.DISSOLVE_ORGANIZATION:
        case daoCallables.ADD_MEMBERS:
        case daoCallables.ADD_TASKS:
        case daoCallables.REMOVE_MEMBERS:
        case daoCallables.REMOVE_TASKS:
          setMemberOrTask(value);
          break;
        default:
      }
    },
    [setMemberOrTask]
  );

  const buttonClick = useCallback(
    actionType => {
      setActionType(actionType);
      resetFields();
      setOpen(true);
    },
    [resetFields]
  );

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

  const searchOrganization = () => {
    getApplicants(searchOrg);
  };

  const handleOnSearchOrg = val => {
    setSearchOrg(val);
  };

  return (
    <>
      {type === 'joined' && (
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
                          className={styles.visionButton}
                          color="green"
                          type="submit"
                          onClick={() => buttonClick('joined_sign')}
                        >
                          Sign vision
                        </Button>
                        <Button
                          className={styles.visionButton}
                          color="orange"
                          onClick={() => buttonClick('joined_unsign')}
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
        </>
      )}
      {type === 'own' && (
        <Grid className={styles.grid} columns={4} stackable>
          <Grid.Row className={styles.row}>
            <Grid.Column className={styles.column}>
              <Button
                color="green"
                type="submit"
                onClick={() => buttonClick('own_createVision')}
              >
                Create vision
              </Button>
            </Grid.Column>
            <Grid.Column className={styles.column}>
              <Button
                color="green"
                type="submit"
                onClick={() => buttonClick('own_createOrganization')}
              >
                Create organization
              </Button>
            </Grid.Column>
            <Grid.Column className={styles.column}>
              <Button
                color="green"
                type="submit"
                onClick={() => buttonClick('own_addMember')}
              >
                Add member
              </Button>
            </Grid.Column>
            <Grid.Column className={styles.column}>
              <Button
                color="green"
                type="submit"
                onClick={() => buttonClick('own_addTask')}
              >
                Add task
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className={styles.row}>
            <Grid.Column className={styles.column}>
              <Button
                color="orange"
                onClick={() => buttonClick('own_removeVision')}
              >
                Remove vision
              </Button>
            </Grid.Column>
            <Grid.Column className={styles.column}>
              <Button
                color="orange"
                onClick={() => buttonClick('own_dissolveOrganization')}
              >
                Dissolve organization
              </Button>
            </Grid.Column>
            <Grid.Column className={styles.column}>
              <Button
                color="orange"
                onClick={() => buttonClick('own_removeMembers')}
              >
                Remove members
              </Button>
            </Grid.Column>
            <Grid.Column className={styles.column}>
              <Button
                color="orange"
                onClick={() => buttonClick('own_removeTask')}
              >
                Remove task
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
      <Grid className={styles.gridContainer}>
        <Grid.Row className={styles.row}>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <Input
              placeholder="For ex. MyOrg123"
              action={{
                icon: 'search',
                onClick: searchOrganization,
              }}
              fluid
              type="text"
              label="Search for an organization:"
              value={searchOrg}
              onChange={e => handleOnSearchOrg(e.target.value)}
            />
          </Grid.Column>
        </Grid.Row>
        {allApplicants && (
          <Grid.Row className={styles.row}>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              {allApplicants.map(appl => (
                <div key={appl}>{appl}</div>
              ))}
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        title={modalTitle}
        description="Fill the required field/s below."
        loading={actionLoading || showLoader}
        actionButtonLabel="Submit"
        actionButtonColor="blue"
        actionButtonOnClick={() => daoAction(daoType)}
        showRemoveButton={false}
      >
        <Grid className={styles.gridContainer}>
          <Grid.Row>
            <Grid.Column>
              {visionNameTypes.includes(daoType) && (
                <Input
                  placeholder="Enter an organization's vision name..."
                  fluid
                  type="text"
                  label="Vision name:"
                  value={visionNameForAction || ''}
                  onChange={e =>
                    handleTopInputOnChange(daoType, e.target.value)
                  }
                />
              )}
              {orgNameTypes.includes(daoType) && (
                <Input
                  placeholder="Enter an organization name..."
                  fluid
                  type="text"
                  label="Organization name:"
                  value={organizationNameForAction || ''}
                  onChange={e =>
                    handleTopInputOnChange(daoType, e.target.value)
                  }
                />
              )}
            </Grid.Column>
          </Grid.Row>
          {memberAndTaskTypes.includes(daoType) && (
            <Grid.Row>
              <Grid.Column>
                <Input
                  placeholder="Enter value..."
                  fluid
                  type="text"
                  label={taskTypes.includes(daoType) ? 'Task:' : 'Member:'}
                  value={memberOrTaskForAction || ''}
                  onChange={e =>
                    handleBottomInputOnChange(daoType, e.target.value)
                  }
                />
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </Modal>
    </>
  );
};

Organizations.displayName = 'Organizations';

export { Organizations };
