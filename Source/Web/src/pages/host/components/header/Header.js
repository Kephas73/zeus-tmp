import { Button, Container } from '@material-ui/core';
import React from 'react';
import "./index.css"
const Header = ({setOpen}) => {
  return (
    <>
        <div className="header">
            <div>header</div>
            <Button variant="contained" onClick={() => setOpen(false)}>Button</Button>
        </div>
    </>
  );
};

export default Header;
