import 'date-fns';
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
}));

const CustomKeyboardDatePicker = withStyles({
  root: {
    '& .MuiInputBase-input': {
      color: '#000', // Màu chữ bên trong input
    },
    '& .MuiInput-underline:before': {
      color: '#fff',
      borderBottom: 'none', // Loại bỏ viền dưới mặc định
    },
    '& .MuiInput-underline:after': {
      color: '#fff',
      borderBottom: 'none', // Loại bỏ viền dưới mặc định
    },
  },
})(KeyboardDatePicker);

export default function DatePickerYearMonth() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const classes = useStyles();

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
          label="Custom Date Picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
