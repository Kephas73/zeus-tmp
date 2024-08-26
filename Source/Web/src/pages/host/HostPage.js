import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Box, Button, Modal } from '@material-ui/core';

import Overall from './components/overall/Overall';
import Skill from './components/skill/Skill';
import Header from './components/header/Header';
import Operator from './components/operator';

const styles = (theme) => ({
  hostContainerHostPage: {
    width: '100%',
    height: '100vh',
  },
  hostContainerOperator: {
    display: 'grid',
    gridTemplateColumns: '35% auto',
    gap: '10px',
  },
  hostHeaderContainer: {
    margin: '20px 20px',
    width: '50%',
  },
  hostModal: {
    padding: '30px',
  },
  hostPage: {
    backgroundColor: theme.palette.background.default, // Use theme colors
    borderRadius: '7px',
    height: 'calc(97vh - 30px)',
    overflow: 'auto',
    padding: '30px',
  },
  hostContainerOperatorSkill: {
    display: 'grid',
    gridTemplateColumns: '35% auto',
    gap: '10px',
    marginBottom: '20px',
  },
  hostTableWrapper: {
    overflowX: 'auto', // Horizontal scrolling for large tables
    WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    minWidth: '800px', // Ensures tables have a minimum width
    marginBottom: '20px',
  },
  // Media queries
  '@media (max-width: 1680px)': {
    hostContainerOperatorSkill: {
      gridTemplateColumns: '1fr',
      gap: '20px',
    },
    hostContainerOperator: {
      gridTemplateColumns: '1fr',
      gap: '20px',
      marginBottom: '20px',
    },
    hostPage: {
      width: '100%',
      margin: '0 auto',
      padding: '10px',
    },
    hostHeaderContainer: {
      textAlign: 'center',
      padding: '0 15px',
    },
    hostTableWrapper: {
      overflowX: 'auto', // Allows horizontal scrolling
      WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
    },
    table: {
      width: '100%',
      minWidth: '600px', // Ensures tables have a minimum width
    },
  },
  '@media (max-width: 768px)': {
    hostPageContainer: {
      width: '100vw',
    },
    hostModal: {
      padding: '20px 10px',
      width: '100vw',
    },
    hostPage: {
      padding: '5px',
      height: 'calc(97vh - 10px)',
    },
    hostHeaderContainer: {
      button: {
        marginTop: '10px',
        width: '100%',
      },
    },
  },
});

const HostPage = ({ classes }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={classes.hostPageContainer}>
      <div className={classes.hostHeaderContainer}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          センターパフォーマンス
        </Button>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.hostModal}
      >
        <Box>
          <div className={classes.hostPage}>
            <Header setOpen={setOpen} />
            <div>
              <div className={classes.hostContainerOperatorSkill}>
                <Overall />
                <Skill />
              </div>
              <div className={classes.hostContainerOperator}>
                <Operator />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default withStyles(styles)(HostPage);
