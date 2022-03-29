import React from 'react';
import {
  Button,
  Grid,
  Segment,
  Portal,
  Card,
  Placeholder,
  Icon,
} from 'semantic-ui-react';
import styles from './Modal.module.scss';

const Modal = ({
  title,
  description,
  open,
  onClose,
  loading,
  actionButtonLabel,
  actionButtonColor,
  actionButtonOnClick,
  removeButtonLabel,
  removeButtonOnClick,
  showRemoveButton,
  children,
}) => {
  // TODO: make it scrollable;

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
            <Card fluid className={styles.card} style={{ boxShadow: 'none' }}>
              {!loading && (
                <Card.Content>
                  <Card.Header className={styles.cardHeader}>
                    {title}
                    <Button
                      circular
                      basic
                      onClick={onClose}
                      icon={<Icon name="close" />}
                    />
                  </Card.Header>
                </Card.Content>
              )}
              {loading && (
                <Card.Content>
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line />
                    </Placeholder.Header>
                  </Placeholder>
                </Card.Content>
              )}
              {!loading && <Card.Content description={description} />}
              {loading && (
                <Card.Content>
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line />
                    </Placeholder.Header>
                  </Placeholder>
                </Card.Content>
              )}
              {!loading && (
                <Card.Content className={styles.body}>{children}</Card.Content>
              )}
              {loading && (
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
              {!loading && (
                <Card.Content extra>
                  <Button
                    color={actionButtonColor || 'blue'}
                    type="submit"
                    data-cy='modalSubmit'
                    onClick={actionButtonOnClick}
                    loading={loading}
                    disabled={loading}
                  >
                    {actionButtonLabel}
                  </Button>
                  {showRemoveButton && (
                    <Button
                      color="red"
                      onClick={removeButtonOnClick}
                      loading={loading}
                      disabled={loading}
                    >
                      {removeButtonLabel}
                    </Button>
                  )}
                </Card.Content>
              )}
              {loading && (
                <Card.Content extra>
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line />
                    </Placeholder.Header>
                  </Placeholder>
                </Card.Content>
              )}
            </Card>
          </Segment>
        </Portal>
      </Grid.Column>
    </Grid>
  );
};

Modal.displayName = 'Modal';

export { Modal };
