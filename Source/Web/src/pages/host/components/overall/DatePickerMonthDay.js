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
    '& .MuiInputBase-root': {
      color: '#fff',
      fontSize: '16px',
      borderRadius: '50px',
      border: '1px solid #fff',
      padding: '5px 15px',
      width: "60%",
    },
  },
  customIcon: {
    color: '#fff', // Thay đổi màu của biểu tượng thành trắng
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const CustomKeyboardDatePicker = withStyles({
  root: {
    '& .MuiInputBase-root': {
      borderRadius: '50px',
      border: '1px solid #fff',
      with: '50%',
      '&:before': {
        borderBottom: 'none',
      },
      '&:after': {
        borderBottom: 'none',
      },
    },
    '& .MuiIconButton-root': {
      color: '#fff',
      padding: 'none'
    },
  },
})(KeyboardDatePicker);

export default function DatePickerMonthDay() {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const classes = useStyles();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        <CustomKeyboardDatePicker
          className={classes.root}
          disableToolbar
          views={['month', 'date']}
          variant="inline"
          format="MM/dd"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          keyboardIcon={<ArrowDropDownIcon />}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
