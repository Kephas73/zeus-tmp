import React, { useState } from 'react';

import { Box, Button, Modal } from '@material-ui/core';

import Overall from './components/overall/Overall';
import Skill from './components/skill/Skill';
import Header from './components/header/Header';
import Operator from './components/operator';
import './index.css';

const HostPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="host-page-container">
      <div className="host-header-container">
        <h1>Welcome to the Host Page!</h1>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Modal
        </Button>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="host-modal"
      >
        <Box>
          <div className="host-page">
            <Header setOpen={setOpen} />
            <div className="host-container">
              <div className="host-container-operator-skill">
                <Overall />
                <Skill />
              </div>
              <div className="host-container-operator">
                <Operator />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default HostPage;
