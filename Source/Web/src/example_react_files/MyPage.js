import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withStyles,
  createTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import { withRoomContext } from '../../../../RoomContext';
import Button from '@material-ui/core/Button';

// components
import MonthlySalesAmount from '../../Common/MonthlySalesAmount';
import NofiticationDialog from './NofiticationDialog';

// material Ui
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core//Checkbox';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

// util
import { showTaxIncludedAmount } from '../../../../utils';

// const
import { CONSUMPTION_TAX } from '../../../../const';

// dayjs
import dayjs from 'dayjs';
import { Typography } from '@material-ui/core';

// dayjsの タイムゾーンの設定
dayjs.extend(require('dayjs/plugin/timezone'));
dayjs.extend(require('dayjs/plugin/utc'));
dayjs.extend(require('dayjs/plugin/objectSupport'));
dayjs.tz.setDefault('Asia/Tokyo');

const drawerWidth = 250;

const styles = (theme) => ({
  homeWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflowX: 'auto',
    backgroundColor: 'var(--color-white)',
    borderRadius: '5px',
  },
  monthlyWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflowX: 'auto',
    backgroundColor: 'transparent',
    borderRadius: '5px',
  },
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1670px',
    padding: '0 20px',
    position: 'relative',
    color: 'var(--text-color)',
    fontSize: '0.9rem',
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
      width: `calc( 100vw - ${drawerWidth + 40}px )`,
    },
  },
  rootHome: {
    minWidth: '450px',
  },
  rootMonthly: {
    minWidth: '510px',
  },
  homeInfoSection: {
    marginTop: '10px',
  },
  infoBox: {
    width: '100%',
    maxWidth: '1290px',
    border: '1px solid #292929',
    position: 'relative',
    height: '125px',
    marginTop: '40px',
    padding: '8px',
  },
  infoTitle: {
    backgroundColor: 'var(--color-white)',
    position: 'absolute',
    top: '-18px',
    left: '40px',
    height: '20px',
    width: '120px',
    textAlign: 'center',
  },
  infoContentBox: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    listStyle: 'inside',
  },
  infoContent: {
    width: '100%',
    marginTop: '10px',
  },
  infoContentItem: {
    display: 'list-item',
    color: '#292929',
    fontSize: '0.8rem',
    margin: '3px 5px',
    fontFamily:
      '"Hiragino Kaku Gothic Pro","Hiragino Kaku Gothic ProN","Hiragino Sans","Meiryo",Arial,sans-serif',
  },
  infoContentTitle: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  notificationDate: {
    marginRight: '14px',
  },
  homeContentSection: {
    minHeight: '400px',
    marginTop: '20px',
  },
  homeContentBox: {
    width: '100%',
    maxWidth: '1290px',
    minHeight: '180px',
    marginTop: '50px',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '1px 1px 3px #bbb inset',
  },
  homeContentBoxSold: {
    backgroundColor: '#F1FFFF',
  },
  homeContentBoxPurchased: {
    backgroundColor: '#FFE7F0',
  },
  detailButton: {
    marginTop: '15px',
    color: 'var(--color-white)',
    padding: '2px 30px',
  },
  detailButtonSales: {
    backgroundColor: '#036EB6',
    '&:hover': {
      backgroundColor: '#036EB6',
    },
  },
  detailButtonPurchase: {
    backgroundColor: '#CD2C82',
    '&:hover': {
      backgroundColor: '#CD2C82',
    },
  },
  listHeaderSection: {
    marginTop: '10px',
  },
  listActionSection: {
    marginTop: '10px',
  },
  listTableSection: {
    marginTop: '10px',
  },
  title: {
    color: '#292929',
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  tableSection: {
    overflowY: 'auto',
    flexGrow: '1',
    padding: '10px',
    backgroundColor: 'var(--color-white)',
    borderRadius: '10px',
  },
  tableContainer: {
    maxHeight: '100%',
  },
  table: {
    overflowX: 'hidden',
  },
  navigationSection: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'flex-between',
    fontSize: '1rem',
    marginBottom: '10px',
  },
  dateNavigation: {
    display: 'flex',
    justifyContent: 'flex-start',
    color: '#292929',
  },
  dateNavigationButtons: {
    display: 'flex',
    justifyContent: 'flex-between',
    marginLeft: '10px',
  },
  dateNavigationButton: {
    height: '23px',
    padding: '0 10px',
    fontSize: '0.9rem',
    color: '#292929',
    border: '1px solid #292929',
  },
  dateNavigationCurrent: {
    width: '150px',
    textAlign: 'center',
  },
  exportButtonWrapper: {
    marginLeft: '40px',
    marginTop: '-2px',
  },
  exportButton: {
    height: '23px',
    padding: '0 10px',
    fontSize: '0.9rem',
    color: '#292929',
    border: '1px solid #292929',
  },
  tableBg: {
    display: 'flex',
    position: 'absolute',
    height: '80%',
    width: '92%',
    minWidth: 1205,
    zIndex: '0',
    overflow: 'auto',
  },
  tableBgLine: {
    height: '100%',
    borderRight: '1px solid #ccc',
  },
  headerSection: {
    backgroundColor: 'var(--color-white)',
    width: '100%',
    borderRadius: '20px',
    padding: '20px 20px 21px 20px',
  },
  tableHeader: {
    paddingTop: '10px',
    display: 'flex',
    width: '100%',
  },
  tableHeaderSales: {
    borderTop: '2px solid #0A6EB2',
  },
  tableHeaderPurchase: {
    borderTop: '2px solid #CC2E80',
  },
  tableHeaderText: {
    fontSize: '0.8rem',
    textAlign: 'center',
    padding: '1rem 0',
  },
  tableData: {
    display: 'flex',
    listStyle: 'none',
    marginBottom: '0.8rem',
    width: '100%',
  },
  tableDataBg: {
    display: 'flex',
    width: '100%',
    border: 'none',
    borderRadius: '0.5rem',
    background: 'transparent',
    alignItems: 'center',
    zIndex: 1,
  },
  tableDataValues: {
    display: 'flex',
    width: '100%',
    border: 'none',
    borderRadius: '0.5rem',
    background: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    zIndex: 1,
  },
  tableDataValue: {
    paddingTop: '1.2rem',
    paddingBottom: '1rem',
    margin: '0 0 0 0',
    color: '#888',
    textAlign: 'center',
    fontSize: '0.8rem',
  },
  commissionPercent: {
    borderRight: '1px dashed rgba(224, 224, 224, 1) !important',
  },
  code: {
    width: '65%',
    paddingLeft: '0.5%',
    paddingRight: '0.5%',
    display: 'flex',
    justifyContent: 'flex-between',
    '& > input': {
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '0.5rem',
      padding: '0.3rem 0.5rem',
      boxShadow: '2px 2px 4px inset #eee',
      color: '#999898',
      fontSize: '0.9rem',
      width: '95%',
    },
  },
  datetime: {
    display: 'flex',
    justifyContent: 'center',
    width: '17%',
  },
  codeBg: {
    textAlign: 'left',
  },
  datetimeBg: {
    width: '80%',
    background: '#999898',
    padding: '0.2rem 0.3rem',
    borderRadius: '0.3rem',
    color: 'white',
    textAlign: 'center',
    height: '1.5rem',
  },
  center: {
    width: `calc( 100% - ${drawerWidth}px )`,
    height: 'calc( 100% - 40px )',
    overflow: 'auto',
    marginTop: '5px',
    marginBottom: '1%',
  },
  adminButtons: {
    width: '100%',
    height: '40px',
    display: 'flex',
    justifyContent: 'end',
  },
  adminBtn: {
    background: '#e26b04',
    border: '1px solid #e26b04',
    borderRadius: '0.3rem',
    color: 'var(--color-white)',
    padding: '0.1rem 1rem',
    fontSize: '0.8rem',
    '&:hover': {
      backgroundColor: 'var(--color-white)',
      color: '#e26b04',
      opacity: 0.8,
    },
  },
  codeValue: {
    width: 'calc( 100% - 50px )',
  },
  codeBtn: {
    width: '50px',
  },
  valueInput: {
    '&:disabled': {
      backgroundColor: '#F7F9F9',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

const theme = createTheme({
  typography: {
    fontFamily:
      '"Hiragino Kaku Gothic Pro","Hiragino Kaku Gothic ProN","Hiragino Sans","Meiryo",Arial,sans-serif',
  },
  overrides: {
    MuiTableCell: {
      root: {
        borderRight: '1px solid rgba(224, 224, 224, 1)',
      },
    },
  },
});

// const createSplittedKey = (key, length=4) =>
// {
// 	let finalString = '';

// 	// eslint-disable-next-line prefer-template
// 	const keyArray = key.split(new RegExp('(.{' + length.toString() + '})')).filter((x) => x.length !== 0);

// 	keyArray.forEach((k, index) =>
// 	{
// 		if (index === 0)
// 		{
// 			finalString += k;
// 		}
// 		else
// 		{
// 			// eslint-disable-next-line prefer-template
// 			finalString += '-' + k;
// 		}
// 	});

// 	return finalString;
// };

const today = new Date();

const thisYear = today.getFullYear();

const thisMonth = today.getMonth() + 1;

let nextMonth = thisMonth + 1;

let nextMonthYear = thisYear;

if (nextMonth > 12) {
  nextMonth = nextMonth - 12;
  nextMonthYear = nextMonthYear + 1;
}

const showNumberHint = (accountIdentifier, numberHint) => {
  if (accountIdentifier && numberHint) {
    return `${accountIdentifier?.toUpperCase()}********${numberHint}`;
  } else {
    return '';
  }
};

const showDate = (timestamp) => {
  if (timestamp?.seconds) {
    return dayjs.unix(timestamp.seconds).format('YYYY.MM.DD');
  }
};

const showMinutesFromSeconds = (s) => {
  if (s === -1) {
    return '使い放題';
  } else if (s) {
    return Math.ceil(s / 60);
  } else {
    return 0;
  }
};

const calcMinutesFromSeconds = (s) => {
  if (s === -1) {
    return null;
  } else if (s) {
    return Math.ceil(s / 60);
  } else {
    return 0;
  }
};

const includeConsumptionTax = (amount) => {
  return Math.floor(amount * (1 + CONSUMPTION_TAX));
};

const MyPage = ({
  classes,
  purchasedTickets,
  setPurchasedTickets,
  soldTickets,
  setSoldTickets,
  mypageContent,
  setMypageContent,
  serviceAccountId,
  notifications,
  selfTicketPurchase,
}) => {
  const [purchasedAmount, setPurchasedAmount] = useState(null);

  const [holesalePurchasedAmount, setHolesalePurchasedAmount] = useState(null);

  const [purchasedCount, setPurchasedCount] = useState(0);

  const [soldAmount, setSoldAmount] = useState(null);

  const [soldCount, setSoldCount] = useState(0);

  const [commissionAmount, setCommissionAmount] = useState(null);

  const [purchasedTicketsFiltered, setPurchasedTicketsFiltered] = useState([]);

  const [soldTicketsFiltered, setSoldTicketsFiltered] = useState([]);

  const [notificationDialogState, setNotificationDialogState] = useState({
    open: false,
    notification: {},
  });

  const [targetDate, setTargetDate] = useState({
    year: thisYear,
    month: thisMonth,
    nextMonthYear: nextMonthYear,
    nextMonth: nextMonth,
  });

  useEffect(() => {
    const date = dayjs({
      y: targetDate.year,
      M: targetDate.month - 1,
      d: 1,
    });

    let salesAmountVal = 0;

    let holesaleAmountVal = 0;

    let purchaseCount = 0;

    const startMonth = date.startOf('month').valueOf();

    const endMonth = date.endOf('month').valueOf();

    const items = [];

    purchasedTickets.forEach((item) => {
      if (item.createdAt >= startMonth && item.createdAt <= endMonth) {
        if (item.orderCanceled) {
          items.push({
            ...item,
            selected: item.selected ? item.selected : false,
            salesAmount: 0,
            holesaleAmount: 0,
          });
        } else {
          items.push({
            ...item,
            selected: item.selected ? item.selected : false,
          });
          purchaseCount += 1;
          salesAmountVal += includeConsumptionTax(item.salesAmount);
          holesaleAmountVal += includeConsumptionTax(item.holesaleAmount);
        }
      }
    });

    setPurchasedAmount(salesAmountVal);
    setPurchasedCount(purchaseCount);
    setHolesalePurchasedAmount(holesaleAmountVal);

    items.sort((a, b) => {
      if (a.salesAmount < b.salesAmount) {
        return -1;
      }
      if (a.salesAmount > b.salesAmount) {
        return 1;
      }

      return 0;
    });

    items.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }

      return 0;
    });

    setPurchasedTicketsFiltered([...items]);
  }, [purchasedTickets, targetDate]);

  useEffect(() => {
    let salesAmountVal = 0;

    let commissionAmountVal = 0;

    const date = dayjs({
      year: targetDate.year,
      month: targetDate.month - 1,
      day: 1,
    });

    const startMonth = date.startOf('month').valueOf();

    const endMonth = date.endOf('month').valueOf();

    const items = [];

    let salesCount = 0;

    soldTickets.forEach((item) => {
      if (item.createdAt >= startMonth && item.createdAt <= endMonth) {
        // 自社販売
        if (item.account === serviceAccountId) {
          if (item.orderCanceled) {
            items.push({
              ...item,
              selected: item.selected ? item.selected : false,
              distributorName: '',
              percentageValue: item.commissionPercentage,
              commissionValue: 0,
              salesAmount: 0,
            });
          } else {
            items.push({
              ...item,
              selected: item.selected ? item.selected : false,
              distributorName: '',
              percentageValue: item.commissionPercentage,
              commissionValue: item.commission,
            });
            salesCount += 1;
            salesAmountVal += includeConsumptionTax(item.salesAmount);
            commissionAmountVal += includeConsumptionTax(item.commission);
          }
        }
        // brokerになっているaccountが販売
        else if (item.orderCanceled) {
          items.push({
            ...item,
            selected: item.selected ? item.selected : false,
            distributorName: item.accountName,
            percentageValue: item.brokerPercentage,
            commissionValue: 0,
            salesAmount: 0,
          });
        } else {
          items.push({
            ...item,
            selected: item.selected ? item.selected : false,
            distributorName: item.accountName,
            percentageValue: item.brokerPercentage,
            commissionValue: item.brokerCommission,
          });
          salesCount += 1;
          salesAmountVal += includeConsumptionTax(item.salesAmount);
          commissionAmountVal += includeConsumptionTax(item.brokerCommission);
        }
      }
    });

    items.sort((a, b) => {
      if (a.salesAmount < b.salesAmount) {
        return -1;
      }
      if (a.salesAmount > b.salesAmount) {
        return 1;
      }

      return 0;
    });

    items.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }

      return 0;
    });

    setSoldAmount(salesAmountVal);
    setSoldCount(salesCount);
    setCommissionAmount(commissionAmountVal);

    setSoldTicketsFiltered([...items]);
  }, [serviceAccountId, soldTickets, targetDate]);

  const showDateTime = (timestamp) => {
    if (!timestamp) {
      return '';
    } else {
      return dayjs(timestamp).format('YYYY.MM.DD HH:mm');
    }
  };

  const toggleSoldTicketFiltered = (itemId) => {
    setSoldTickets((state) => {
      const items = [...state];

      const targetIndex = items.findIndex((item) => item.id === itemId);

      if (targetIndex !== -1) {
        items[targetIndex].selected = !items[targetIndex].selected;
      }

      return [...items];
    });
  };

  const togglePurchasedTicketFiltered = (itemId) => {
    setPurchasedTickets((state) => {
      const items = [...state];

      const targetIndex = items.findIndex((item) => item.id === itemId);

      if (targetIndex !== -1) {
        items[targetIndex].selected = !items[targetIndex].selected;
      }

      return [...items];
    });
  };

  const changeTargetMonth = (val) => {
    setTargetDate((state) => {
      let newMonth = state.month + val;

      let newYear = state.year;

      if (newMonth < 1) {
        newYear = newYear - 1;
        newMonth = 12;
      } else if (newMonth > 12) {
        newYear = newYear + 1;
        newMonth = 1;
      }

      let newNextMonthYear = newYear;

      let newNextMonth = newMonth + 1;

      if (newNextMonth > 12) {
        newNextMonthYear = newNextMonthYear + 1;
        newNextMonth = 1;
      }

      return {
        year: newYear,
        month: newMonth,
        nextMonthYear: newNextMonthYear,
        nextMonth: newNextMonth,
      };
    });
  };

  const downloadFile = ({ data, fileName, fileType }) => {
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([bom, data], { type: fileType });
    const a = document.createElement('a');

    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);

    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    a.dispatchEvent(clickEvent);
    a.remove();
  };

  const exportPurchaseToCsv = () => {
    const headers = [
      '日付,チケットコード,メールアドレス,追加メール送信先1,追加メール送信先2,利用分数,御社販売価格, 卸売価格',
    ];

    const body = [];

    purchasedTicketsFiltered.forEach((d) => {
      const {
        createdAt,
        accountParamKey,
        numberHint,
        email,
        additionalEmail1,
        additionalEmail2,
        duration,
        salesAmount,
        holesaleAmount,
        orderCanceled,
      } = d;

      body.push(
        [
          showDateTime(createdAt),
          orderCanceled
            ? '購入キャンセル'
            : showNumberHint(accountParamKey, numberHint),
          email,
          additionalEmail1,
          additionalEmail2,
          calcMinutesFromSeconds(duration),
          salesAmount,
          holesaleAmount,
        ].join(',')
      );
    });

    downloadFile({
      data: [...headers, ...body].join('\n'),
      fileName: 'purchase.csv',
      fileType: 'text/csv',
    });
  };

  const exportSalesToCsv = () => {
    const headers = [
      '日付,チケットコード,二次代理店,メールアドレス,携帯電話番号,利用分数,販売価格,手数料(%),手数料',
    ];

    const body = [];

    soldTicketsFiltered.forEach((d) => {
      const {
        createdAt,
        accountParamKey,
        numberHint,
        distributorName,
        email,
        phoneNumber,
        duration,
        salesAmount,
        percentageValue,
        commissionValue,
        orderCanceled,
      } = d;

      body.push(
        [
          showDateTime(createdAt),
          orderCanceled
            ? '購入キャンセル'
            : showNumberHint(accountParamKey, numberHint),
          distributorName,
          email,
          phoneNumber.toString(),
          calcMinutesFromSeconds(duration),
          salesAmount,
          percentageValue,
          commissionValue,
        ].join(',')
      );
    });

    downloadFile({
      data: [...headers, ...body].join('\n'),
      fileName: 'sales.csv',
      fileType: 'text/csv',
    });
  };

  const showNotification = (item) => {
    setNotificationDialogState({
      open: true,
      notification: { ...item },
    });
  };

  return (
    <MuiThemeProvider theme={theme}>
      <NofiticationDialog
        open={notificationDialogState.open}
        handleClose={() =>
          setNotificationDialogState({
            open: false,
            notification: {},
          })
        }
        notification={notificationDialogState.notification}
      />

      {mypageContent === 'purchasedList' ? (
        <Box className={classes.monthlyWrapper}>
          <Box className={`${classes.root} ${classes.rootMonthly}`}>
            <Box className={classes.headerSection}>
              <Box
                className={`${classes.tableHeader} ${classes.tableHeaderPurchase}`}
              >
                <Typography className={classes.title}>
                  登録企業が購入(支払い)
                </Typography>
              </Box>
              <MonthlySalesAmount
                originPage={'manage'}
                data={'purchase'}
                year={targetDate.year}
                month={targetDate.month}
                paymentYear={targetDate.nextMonthYear}
                paymentMonth={targetDate.nextMonth}
                ticketsListLength={purchasedCount}
                salesAmount={purchasedAmount}
                holesaleAmount={holesalePurchasedAmount}
                commissionAmount={null}
              />
            </Box>
            <Box className={classes.navigationSection}>
              <Box className={classes.dateNavigation}>
                <Box className={classes.dateNavigationButtons}>
                  <Button
                    className={classes.dateNavigationButton}
                    startIcon={<NavigateBeforeIcon />}
                    onClick={() => changeTargetMonth(-1)}
                  >
                    前月
                  </Button>
                  <Box className={classes.dateNavigationCurrent}>
                    {targetDate.year}年{targetDate.month}
                    月分
                  </Box>
                  {(thisYear !== targetDate?.year ||
                    thisMonth !== targetDate?.month) && (
                    <Button
                      className={classes.dateNavigationButton}
                      startIcon={<NavigateNextIcon />}
                      onClick={() => changeTargetMonth(1)}
                    >
                      翌月
                    </Button>
                  )}
                </Box>
              </Box>

              <Box className={classes.exportButtonWrapper}>
                <Button
                  className={classes.exportButton}
                  onClick={exportPurchaseToCsv}
                >
                  CSV出力
                </Button>
              </Box>
            </Box>

            <Box className={classes.tableSection}>
              <TableContainer component={Paper}>
                <Table
                  stickyHeader
                  className={classes.table}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell> </TableCell>
                      <TableCell align="center">日付</TableCell>
                      <TableCell align="center">チケットコード</TableCell>
                      <TableCell align="center">追加メール送信先1</TableCell>
                      <TableCell align="center">追加メール送信先2</TableCell>
                      <TableCell align="center">利用分数</TableCell>
                      <TableCell align="center">定価</TableCell>
                      <TableCell align="center">御社購入価格</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {purchasedTicketsFiltered.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell padding="checkbox" align="center">
                          <Checkbox
                            checked={row.selected}
                            inputProps={{
                              'aria-labelledby': `checkBox-${row.id}`,
                            }}
                            onClick={() =>
                              togglePurchasedTicketFiltered(row.id)
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          {showDateTime(row.createdAt)}
                        </TableCell>
                        <TableCell align="center">
                          {row.orderCanceled
                            ? '購入キャンセル'
                            : showNumberHint(
                                row.accountParamKey,
                                row.numberHint
                              )}
                        </TableCell>
                        <TableCell align="center">
                          {row.additionalEmail1}
                        </TableCell>
                        <TableCell align="center">
                          {row.additionalEmail2}
                        </TableCell>
                        <TableCell align="center">
                          {showMinutesFromSeconds(row.duration)}
                        </TableCell>
                        <TableCell align="center">
                          {showTaxIncludedAmount(row.salesAmount)}円
                        </TableCell>
                        <TableCell align="center">
                          {showTaxIncludedAmount(row.holesaleAmount)}円
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      ) : mypageContent === 'soldList' ? (
        <Box className={classes.monthlyWrapper}>
          <Box className={`${classes.root} ${classes.rootMonthly}`}>
            <Box className={classes.headerSection}>
              <Box
                className={`${classes.tableHeader} ${classes.tableHeaderSales}`}
              >
                <Typography className={classes.title}>
                  利用者が購入(売上)
                </Typography>
              </Box>
              <MonthlySalesAmount
                originPage={'manage'}
                data={'customerSales'}
                year={targetDate.year}
                month={targetDate.month}
                paymentYear={targetDate.nextMonthYear}
                paymentMonth={targetDate.nextMonth}
                ticketsListLength={soldCount}
                salesAmount={soldAmount}
                paymentAmount={commissionAmount}
                holesaleAmount={null}
                commissionAmount={commissionAmount}
              />
            </Box>
            <Box className={classes.navigationSection}>
              <Box className={classes.dateNavigation}>
                <Box className={classes.dateNavigationButtons}>
                  <Button
                    className={classes.dateNavigationButton}
                    startIcon={<NavigateBeforeIcon />}
                    onClick={() => changeTargetMonth(-1)}
                  >
                    前月
                  </Button>
                  <Box className={classes.dateNavigationCurrent}>
                    {targetDate.year}年{targetDate.month}
                    月分
                  </Box>
                  {(thisYear !== targetDate?.year ||
                    thisMonth !== targetDate?.month) && (
                    <Button
                      className={classes.dateNavigationButton}
                      startIcon={<NavigateNextIcon />}
                      onClick={() => changeTargetMonth(1)}
                    >
                      翌月
                    </Button>
                  )}
                </Box>
              </Box>

              <Box className={classes.exportButtonWrapper}>
                <Button
                  className={classes.exportButton}
                  onClick={exportSalesToCsv}
                >
                  CSV出力
                </Button>
              </Box>
            </Box>

            <Box className={classes.tableSection}>
              <TableContainer
                component={Paper}
                className={classes.tableContainer}
              >
                <Table
                  stickyHeader
                  className={classes.table}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell> </TableCell>
                      <TableCell align="center">日付</TableCell>
                      <TableCell align="center">チケットコード</TableCell>
                      <TableCell align="center">二次代理店</TableCell>
                      <TableCell align="center">メールアドレス</TableCell>
                      <TableCell align="center">利用分数</TableCell>
                      <TableCell align="center">販売価格</TableCell>
                      <TableCell align="center" colSpan={2}>
                        手数料
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {soldTicketsFiltered.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell padding="checkbox" align="center">
                          <Checkbox
                            checked={row.selected}
                            inputProps={{
                              'aria-labelledby': `checkBox-${row.id}`,
                            }}
                            onClick={() => toggleSoldTicketFiltered(row.id)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          {showDateTime(row.createdAt)}
                        </TableCell>
                        <TableCell align="center">
                          {row.orderCanceled
                            ? '購入キャンセル'
                            : showNumberHint(
                                row.accountParamKey,
                                row.numberHint
                              )}
                        </TableCell>
                        <TableCell align="center">
                          {row.distributorName}
                        </TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">
                          {showMinutesFromSeconds(row.duration)}
                        </TableCell>
                        <TableCell align="center">
                          {showTaxIncludedAmount(row.salesAmount)}円
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.commissionPercent}
                        >
                          {row.percentageValue}%
                        </TableCell>
                        <TableCell align="center">
                          {showTaxIncludedAmount(row.commissionValue)}円
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className={classes.homeWrapper}>
          <Box className={`${classes.root} ${classes.rootHome}`}>
            <Box className={classes.homeInfoSection}>
              <Box className={classes.infoBox}>
                <Typography className={`${classes.title} ${classes.infoTitle}`}>
                  お知らせ
                </Typography>

                <ul className={classes.infoContentBox}>
                  {notifications.map((item) => (
                    <li key={item.id} className={classes.infoContentItem}>
                      <span
                        className={classes.infoContentTitle}
                        onClick={() => showNotification(item)}
                      >
                        {showDate(item.updatedAt)}
                        &nbsp;&nbsp;&nbsp;
                        {item.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
            <Box className={classes.homeContentSection}>
              <Box className={classes.dateNavigation}>
                <Box className={classes.dateNavigationButtons}>
                  <Button
                    className={classes.dateNavigationButton}
                    startIcon={<NavigateBeforeIcon />}
                    onClick={() => changeTargetMonth(-1)}
                  >
                    前月
                  </Button>
                  <Box className={classes.dateNavigationCurrent}>
                    {targetDate.year}年{targetDate.month}
                    月分
                  </Box>
                  {(thisYear !== targetDate?.year ||
                    thisMonth !== targetDate?.month) && (
                    <Button
                      className={classes.dateNavigationButton}
                      startIcon={<NavigateNextIcon />}
                      onClick={() => changeTargetMonth(1)}
                    >
                      翌月
                    </Button>
                  )}
                </Box>
              </Box>
              <Box
                className={`${classes.homeContentBox} ${classes.homeContentBoxSold}`}
              >
                <Typography className={classes.title}>
                  利用者が購入(売上)
                </Typography>
                <MonthlySalesAmount
                  data={'customerSales'}
                  originPage={'manage'}
                  year={targetDate.year}
                  month={targetDate.month}
                  paymentYear={targetDate.nextMonthYear}
                  paymentMonth={targetDate.nextMonth}
                  ticketsListLength={soldCount}
                  salesAmount={soldAmount}
                  holesaleAmount={null}
                  commissionAmount={commissionAmount}
                />

                <Button
                  className={`${classes.detailButton} ${classes.detailButtonSales}`}
                  onClick={() => setMypageContent('soldList')}
                >
                  <FormattedMessage id="label.detail" defaultMessage="Detail" />
                </Button>
              </Box>
              {(selfTicketPurchase || Boolean(purchasedCount)) && (
                <Box
                  className={`${classes.homeContentBox} ${classes.homeContentBoxPurchased}`}
                >
                  <Typography className={classes.title}>
                    登録企業が購入(支払い)
                  </Typography>
                  <MonthlySalesAmount
                    data={'purchase'}
                    originPage={'manage'}
                    year={targetDate.year}
                    month={targetDate.month}
                    paymentYear={targetDate.nextMonthYear}
                    paymentMonth={targetDate.nextMonth}
                    ticketsListLength={purchasedCount}
                    salesAmount={purchasedAmount}
                    holesaleAmount={holesalePurchasedAmount}
                    commissionAmount={null}
                  />

                  <Button
                    className={`${classes.detailButton} ${classes.detailButtonPurchase}`}
                    onClick={() => setMypageContent('purchasedList')}
                  >
                    <FormattedMessage
                      id="label.detail"
                      defaultMessage="Detail"
                    />
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </MuiThemeProvider>
  );
};

MyPage.propTypes = {
  classes: PropTypes.object.isRequired,
  purchasedTickets: PropTypes.array.isRequired,
  setPurchasedTickets: PropTypes.func.isRequired,
  soldTickets: PropTypes.array.isRequired,
  setSoldTickets: PropTypes.func.isRequired,
  mypageContent: PropTypes.string,
  setMypageContent: PropTypes.func.isRequired,
  serviceAccountId: PropTypes.string,
  notifications: PropTypes.array,
  selfTicketPurchase: PropTypes.bool,
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

export default withRoomContext(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {}
  )(withStyles(styles)(MyPage))
);
