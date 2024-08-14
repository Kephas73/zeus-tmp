import { Button, Container, makeStyles } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import './index.css';
const useStyles = makeStyles(() => ({
  customIcon: {
    color: '#939292',
    fontSize: '3rem',
  },
  hostCloseButton: {
    fontWeight: 'bold',
    color: '#939292'
  }
}));
const Header = ({ setOpen }) => {
  const classes = useStyles()
  return (
    <>
      <div className="host-header">
        <div className="host-header-icon">
          <span >
            <PersonIcon className={classes.customIcon}/>
          </span>
          <span className={classes.hostCloseButton}>センターパフォーマンス</span>
        </div>
        <button onClick={() => setOpen(false)} className="host-close-button">
          閉じる
        </button>
      </div>
    </>
  );
};

export default Header;
