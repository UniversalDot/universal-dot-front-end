import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Header,
  Segment,
  Portal,
  Card,
  Placeholder,
  Input,
  Label,
  Icon,
  Message,
} from 'semantic-ui-react';
import styles from './TextEditor.module.scss';
import { useTasks } from '../../hooks/useTasks';
import { useStatus } from '../../hooks/useStatus';

const TextEditor = ({ open, onClose }) => {
  // TODO: add rich text editor; accept children as props; make it scrollable; add props for control;
  const [showLoader, setShowLoader] = useState(false);

  const { populateTask, taskValues, taskAction, isEditMode, actionLoading } =
    useTasks();
  const { status, setStatus } = useStatus();

  const handleOnChange = (key, value) => {
    populateTask({
      key,
      value,
    });
  };

  useEffect(() => {
    if (
      !!status &&
      (status.includes('Current transaction status') ||
        status.includes('Sending...'))
    ) {
      setShowLoader(true);
    }

    if (!!status && status.includes('Finalized')) {
      setShowLoader(false);
      setTimeout(() => {
        setStatus('');
      }, 5000);
    }
  }, [status, setStatus]);

  const TxButton = ({ label, color = 'blue', actionType, loading }) => {
    return (
      <Button
        color={color}
        type="submit"
        onClick={() => taskAction(actionType, taskValues)}
        loading={loading}
        disabled={showLoader}
      >
        {label}
      </Button>
    );
  };

  return (
    <Grid columns={2}>
      <Grid.Column>
        <Portal open={open}>
          <Segment
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              width: '600px',
              padding: '0',
            }}
            raised
          >
            {/* <Header
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>This is an example portal</span>
              <Button onClick={onClose}>Close</Button>
            </Header> */}
            <Card fluid className={styles.card} style={{ boxShadow: 'none' }}>
              {!showLoader && (
                <Card.Content>
                  <Card.Header className={styles.cardHeader}>
                    Create task
                    <Button
                      circular
                      basic
                      onClick={onClose}
                      icon={<Icon name="close" />}
                    />
                  </Card.Header>
                </Card.Content>
              )}
              {showLoader && (
                <Card.Content>
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line />
                    </Placeholder.Header>
                  </Placeholder>
                </Card.Content>
              )}
              {!showLoader && (
                <Card.Content description="Fill the details below to create your task." />
              )}
              {showLoader && (
                <Card.Content>
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line />
                    </Placeholder.Header>
                  </Placeholder>
                </Card.Content>
              )}
              {!showLoader && (
                <Card.Content className={styles.body}>
                  {/* <Search className={styles.search} /> */}
                  <Grid className={styles.gridContainer}>
                    <Grid.Row>
                      <Grid.Column>
                        <Input
                          placeholder="Enter task requirements..."
                          fluid
                          type="text"
                          label="Requirements:"
                          value={taskValues?.requirements || ''}
                          onChange={e =>
                            handleOnChange('requirements', e.target.value)
                          }
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Input
                          placeholder="Enter task budget..."
                          fluid
                          type="text"
                          label="Budget:"
                          value={taskValues?.budget || ''}
                          onChange={e =>
                            handleOnChange('budget', e.target.value)
                          }
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Input
                          placeholder="Enter task deadline"
                          fluid
                          type="text"
                          label="Deadline:"
                          value={taskValues?.deadline || ''}
                          onChange={e =>
                            handleOnChange('deadline', e.target.value)
                          }
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card.Content>
              )}
              {showLoader && (
                <Card.Content>
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Paragraph>
                  </Placeholder>
                </Card.Content>
              )}
              {!showLoader && (
                <Card.Content extra>
                  <TxButton
                    label={isEditMode ? 'Update task' : 'Create task'}
                    color={isEditMode ? 'green' : 'blue'}
                    actionType={isEditMode ? 'UPDATE' : 'CREATE'}
                    loading={actionLoading}
                  />
                  {isEditMode && (
                    <TxButton
                      label="Remove task"
                      color="red"
                      actionType="REMOVE"
                    />
                  )}
                </Card.Content>
              )}
              {showLoader && (
                <Card.Content extra>
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line />
                    </Placeholder.Header>
                  </Placeholder>
                </Card.Content>
              )}
            </Card>
            {status && (
              <div style={{ padding: '0 3rem 2rem 3rem' }}>
                <Message positive={!showLoader} warning={showLoader} icon>
                  {showLoader && <Icon name="circle notched" loading />}
                  {!showLoader && <Icon name="check" />}
                  {/* TODO: word-break: break-all only if we show long hashes, otherwise words are breaking OK */}
                  <Message.Content style={{ wordBreak: 'break-all' }}>
                    <Message.Header>Task status</Message.Header>
                    {status}
                  </Message.Content>
                </Message>
              </div>
            )}
          </Segment>
        </Portal>
      </Grid.Column>
    </Grid>
  );
};

TextEditor.displayName = 'TextEditor';

export { TextEditor };
