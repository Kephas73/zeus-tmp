import { makeStyles } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import './header.css';
const useStyles = makeStyles(() => ({
  customIcon: {
    color: 'var(--text-color-gray)',
    fontSize: '3rem',
  },
  hostCloseButton: {
    fontWeight: 'bold',
    color: 'var(--text-color-gray)'
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
