import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiFormControl-marginNormal': {
      display: 'flex',
      alignItems: 'center',
    },
    '& .MuiInputBase-root': {
      color: 'var(--color-white)',
      fontSize: '14px',
      borderRadius: '4px',
      border: '1px solid var(--color-line-bold)',
      padding: '8px 10px',
      backgroundColor: 'transparent',
      width: '100%',
    },
    '& .MuiInputLabel-root': {
      color: 'var(--color-white)',
      fontSize: '14px',
      marginTop: '-17px',
      transform: 'translate(14px, 10px) scale(1)',
      backgroundColor: 'var(--background-color-gray)',
      padding: '0px 4px',
      zIndex: 1,
      pointerEvents: 'none',
    },
    '& .Mui-focused': {
      color: 'var(--color-white)',
    },
    '& .MuiInputAdornment-root .MuiButtonBase-root': {
      marginLeft: '-12px',
    },
    '& .MuiInputBase-inputAdornedEnd': {
      width: '50%',
    },
    '& .MuiInputBase-adornedEnd': {
      justifyContent: 'center',
    },
  },
}));

const CustomKeyboardDatePicker = withStyles({
  root: {
    '& .MuiInputBase-input': {
      color: 'var(--color-white)',
    },
    '& .MuiInput-underline:before': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:after': {
      borderBottom: 'none',
    },
    '& .MuiIconButton-root': {
      padding: 0,
      borderBottom: 'none',
    },
    '& .MuiButtonBase-root': {
      color: 'var(--color-white)',
    },
    '&:hover .MuiInput-underline:before': {
      borderBottom: 'none', 
    },
  },
})(KeyboardDatePicker);

export default function DatePickerYearMonth({ dateYearMonth, setDateYearMonth }) {
  const classes = useStyles();

  const handleDateChange = (date) => {
    setDateYearMonth(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <CustomKeyboardDatePicker
          className={classes.root}
          views={['year', 'month']}
          disableToolbar
          variant="inline"
          format="yyyy/MM"
          margin="normal"
          id="date-picker-inline"
          label="年 / 月"
          value={dateYearMonth}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          keyboardIcon={<ArrowDropDownIcon />}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

DatePickerYearMonth.propTypes = {
  dateYearMonth: PropTypes.instanceOf(Date).isRequired,
  setDateYearMonth: PropTypes.func.isRequired,
};