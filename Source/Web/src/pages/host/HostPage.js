import React from 'react';
import Operator from './components/operator/Operator';
import Overall from './components/overall/Overall';
import Skill from './components/skill/Skill';
import Container from '@material-ui/core/Container';
import Header from './components/header/Header';
import './index.css';
const HostPage = ({setOpen}) => {
  return (
    <>
      <div className="host-page">
        <Header setOpen={setOpen}/>
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
    </>
  );
};

export default HostPage;