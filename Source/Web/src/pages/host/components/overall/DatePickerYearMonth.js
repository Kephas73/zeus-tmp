import 'date-fns';
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-marginNormal': {
      display: 'flex',
      alignItems: 'center',
    },
    '& .MuiInputBase-root': {
      color: '#fff',
      fontSize: '14px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      padding: '8px 10px',
      backgroundColor: 'transparent',
      width: '100%',
    },
    '& .MuiInputLabel-root': {
      color: '#fff',
      fontSize: '14px',
      marginTop: '-17px',
      transform: 'translate(14px, 10px) scale(1)',
      backgroundColor: '#929291',
      padding: '0px 4px',
      zIndex: 1,
      pointerEvents: 'none',
    },
    '& .Mui-focused': {
      color: '#fff',
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
      color: '#fff',
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
      color: '#fff',
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
      <Grid container justifyContent="space-around">
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
