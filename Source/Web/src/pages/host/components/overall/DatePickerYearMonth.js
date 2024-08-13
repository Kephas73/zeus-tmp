import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DatePickerYearMonth() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          views={['year', 'month']} 
          disableToolbar
          variant="inline"
          format="yyyy/MM"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
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



// import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

// export default function DatePickerYearMonth() {
//   const [selectedDate, setSelectedDate] = React.useState(new Date());

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//       <Grid container justifyContent="space-around">
//         <DatePicker
//           views={['year', 'month']} // Chỉ định chỉ chọn năm và tháng
//           label="Chọn tháng"
//           helperText="Chọn năm và tháng"
//           value={selectedDate}
//           onChange={handleDateChange}
//           format="yyyy/MM" // Định dạng hiển thị
//           margin="normal"
//           id="month-picker-dialog"
//           KeyboardButtonProps={{
//             'aria-label': 'change date',
//           }}
//         />
//       </Grid>
//     </MuiPickersUtilsProvider>
//   );
// }
