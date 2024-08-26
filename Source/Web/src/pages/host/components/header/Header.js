import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(() => ({
  hostHeader: {
    padding: '0px 15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hostHeaderIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  customIcon: {
    color: 'var(--text-color-gray)',
    fontSize: '3rem',
  },
  hostCloseButton: {
    fontWeight: 'bold',
    color: 'var(--text-color-gray)',
  },
  hostCloseButtonElement: {
    padding: '2px 33px',
    backgroundColor: 'var(--background-color-btn-close)',
    border: 'none',
    borderRadius: '5px',
    color: 'var(--color-white)',
    cursor: 'pointer',
    fontSize: '12px',
  },
}));

const Header = ({ setOpen }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.hostHeader}>
        <div className={classes.hostHeaderIcon}>
          <span>
            <PersonIcon className={classes.customIcon} />
          </span>
          <span className={classes.hostCloseButton}>センターパフォーマンス</span>
        </div>
        <button onClick={() => setOpen(false)} className={classes.hostCloseButtonElement}>
          閉じる
        </button>
      </div>
    </>
  );
};

Header.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default Header;
