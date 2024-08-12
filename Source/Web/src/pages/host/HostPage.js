import React from 'react';
import Operator from './components/operator/Operator';
import Overall from './components/overall/Overall';
import Skill from './components/skill/Skill';

const HostPage = () => {
  return (
    <>
      <div>HostPage</div>
      <Operator />
      <Overall />
      <Skill />
    </>
  );
};

export default HostPage;
