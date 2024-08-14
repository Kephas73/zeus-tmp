import React, { useEffect, useState } from 'react';
import Operator from './components/operator/Operator';
import Overall from './components/overall/Overall';
import Skill from './components/skill/Skill';
import Container from '@material-ui/core/Container';
import Header from './components/header/Header';
import './index.css';
import { Box, Button, Modal } from '@material-ui/core';

const HostPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
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
      >
        <Box>
          <div className="host-page">
            <Header setOpen={setOpen} />
            <div className="container">
              <div className="container-operator-skill">
                <Overall />
                <Skill />
              </div>
              <div className="container-operator">
                <Operator />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default HostPage;
