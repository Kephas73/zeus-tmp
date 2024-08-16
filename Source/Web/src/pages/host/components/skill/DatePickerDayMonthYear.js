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
      alignItem: 'center'
    },
    '& .MuiInputBase-root': {
      color: '#666',
      fontSize: '14px',
      borderRadius: '4px',
      border: '1px solid var(--color-line-bold)',
      padding: '8px 10px',
      backgroundColor: 'transparent',
      width: '100%',
    },
    '& .MuiInputLabel-root': {
      color: '#666',
      fontSize: '14px',
      transform: 'translate(14px, 10px) scale(1)', 
      backgroundColor: 'var(--color-white)',
      padding: '0 4px',
      zIndex: 1,
      pointerEvents: 'none',
    },
    '& .Mui-focused': {
      color: '#666',
    },
    '& .MuiInputAdornment-root .MuiButtonBase-root': {
      marginLeft: '-12px',
    },
  },
}));

const CustomKeyboardDatePicker = withStyles({
  root: {
    '& .MuiInputBase-input': {
      color: '#666',
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

export default function DatePickerDayMonthYear() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const classes = useStyles();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <CustomKeyboardDatePicker
          className={classes.root}
          disableToolbar
          variant="inline"
          format="yyyy/MM/dd"
          margin="none"
          id="date-picker-inline"
          label="年 / 月 / 日"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          keyboardIcon={<ArrowDropDownIcon className="host-drop-icon"/>}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
