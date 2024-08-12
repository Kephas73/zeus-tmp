import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withStyles,
  MuiThemeProvider,
  createTheme,
} from '@material-ui/core/styles';
import { withRoomContext } from '../../../../RoomContext';
import Button from '@material-ui/core/Button';

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
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import SearchIcon from '@material-ui/icons/Search';
import CachedIcon from '@material-ui/icons/Cached';

// component
import TicketDetailDialog from './TicketDetailDialog';

// firestore
import { firestore } from '../../../../lib/firebase';

// dayjs
import dayjs from 'dayjs';

import { showDateTime } from '../../../../utils';
import ExpiryDialog from '../ExpiryDialog';

// dayjsの タイムゾーンの設定
dayjs.extend(require('dayjs/plugin/timezone'));
dayjs.extend(require('dayjs/plugin/utc'));
dayjs.extend(require('dayjs/plugin/objectSupport'));
dayjs.tz.setDefault('Asia/Tokyo');

const styles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
    padding: '0 10px',
    position: 'relative',
    color: 'var(--text-color)',
    fontSize: '0.9rem',
  },
  homeContentSection: {
    minHeight: '400px',
    marginTop: '20px',
  },
  homeContentBox: {
    width: '100%',
    maxWidth: '1200px',
    height: '50%',
    marginTop: '50px',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '1px 1px 3px #bbb inset',
  },
  homeContentBoxSold: {
    backgroundColor: '#EBF6F4',
  },
  homeContentBoxPurchased: {
    backgroundColor: '#F9DBE1',
  },
  detailButton: {
    marginTop: '15px',
    backgroundColor: '#cd2c82',
    color: '#FFF',
    padding: '2px 30px',
    '&:hover': {
      backgroundColor: '#D9388E',
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
  scrollBox: {
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 320px)',
  },
  scrollContent: {
    overflowX: 'auto',
    height: '100%',
    paddingRight: '5px',
  },
  table: {
    overflowX: 'hidden',
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
  tableBtn: {
    padding: '3px 8px',
  },
  expiryBtn: {
    backgroundColor: '#9ec317 !important',
    color: '#FFF',
    marginLeft: '10px',
  },
  firstExpiryBtn: {
    marginLeft: '10px',
  },
  search: {
    width: '100%',
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'row',
    padding: '0 0 0 0',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
    },
  },
  searchArea: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
  },
  searchGroup: {
    color: '#878686',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    marginBottom: '0.8rem',
    [theme.breakpoints.down('xs')]: {
      padding: '0.5rem 0',
    },
  },
  searchTitle: {
    width: '8rem',
    textAlign: 'right',
    marginRight: '0.9rem',
  },
  smallTitle: {
    fontSize: '0.8rem',
  },
  searchGroupSearch: {
    width: 'calc(70% + 8rem)',
    color: '#878686',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'end',
    marginRight: '16px',
    [theme.breakpoints.down('xs')]: {
      padding: '0.5rem 0',
    },
  },
  searchInput: {
    background: '#999898',
    padding: '0.5rem 0.7rem',
    borderRadius: '0.5rem',
    color: 'white',
    textAlign: 'left',
    border: 'none',
    width: '70%',
    marginRight: '1rem',
    '&:focus': {
      outline: 'none',
    },
  },
  separator: {
    color: 'var(--text-color)',
    margin: '0 0.5rem',
    fontSize: '1rem',
  },
  searchBtn: {
    width: '6rem',
    borderRadius: '0.5rem',
    fontSize: '0.8rem',
    backgroundColor: '#9ec317',
    color: 'white',
    boxShadow: '2px 2px 4px inset #aaa',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    lineHeight: 1.5,
    whiteSpace: 'nowrap',
    marginRight: '0',
    '&:hover': {
      backgroundColor: '#f50057',
    },
  },
  searchIcon: {
    width: '1rem',
    height: '1rem',
  },
  searchDate: {
    display: 'flex',
    marginRight: '1rem',
  },
  inputDate: {
    width: '10rem',
    fontSize: '0.9rem',
  },
  companyNameCell: {
    minWidth: '120px',
  },
  actionCell: {
    minWidth: '180px',
  },
  exportColumn: {
    width: 'calc(70% + 8rem)',
    color: '#878686',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    marginRight: '16px',
    [theme.breakpoints.down('xs')]: {
      padding: '0.5rem 0',
    },
  },
  exportButtonWrapper: {
    marginLeft: '20px',
  },
  exportButton: {
    height: '23px',
    padding: '0 10px',
    marginRight: '10px',
    fontSize: '0.9rem',
    color: '#292929',
    border: '1px solid #292929',
  },
});

const theme = createTheme({
  typography: {
    fontFamily:
      '"Hiragino Kaku Gothic Pro","Hiragino Kaku Gothic ProN","Hiragino Sans","Meiryo",Arial,sans-serif',
  },
  overrides: {
    MuiOutlinedInput: {
      input: {
        fontSize: '0.8rem',
        padding: '0.5rem 0.8rem',
        border: 'none',
        borderRadius: '0.5rem',
        backgroundColor: 'var(--text-color)',
        boxShadow: '2px 2px 4px inset var(--text-color)',
        color: 'white',
        '&:focus': {
          backgroundColor: 'var(--text-color) !important',
          color: 'white',
          borderRadius: '0.5rem',
        },
      },
      notchedOutline: {
        border: 'none',
        borderRadius: '0.5rem',
      },
    },
  },
});

const showNumberHint = (accountIdentifier, numberHint) => {
  if (accountIdentifier && numberHint) {
    return `${accountIdentifier.toUpperCase()}********${numberHint}`;
  } else {
    return '';
  }
};

const showExpiryTime = (expiryTimestamp, expiryTimestampForUse) => {
  let timestamp = expiryTimestamp;

  if (!timestamp) {
    timestamp = expiryTimestampForUse;
  }

  if (timestamp) {
    return showDateTime(timestamp);
  } else {
    return '';
  }
};

const splitItemsLen = 15;

const ServiceTickets = ({ classes, show }) => {
  const [tickets, setTickets] = useState([]);

  const [filteredTickets, setFilteredTickets] = useState([]);

  const [nextStartItemIndex, setNextStartItemIndex] = useState(splitItemsLen);

  const [filteredTicketsShow, setFilteredTicketsShow] = useState([]);

  const [ticketDetailDialog, setTicketDetailDialog] = useState({
    show: false,
    ticket: {},
  });

  const [ticketExpirylDialog, setTicketExpiryDialog] = useState({
    show: false,
    type: '',
    ticket: {},
  });

  const [searchParamKey, setSearchParamKey] = useState('');

  const [searchCorporateName, setSearchCorporateName] = useState('');

  const [searchCreatedStart, setSearchCreatedStart] = useState('');

  const [searchCreatedEnd, setSearchCreatedEnd] = useState('');

  const [searchTicketCode, setSearchTicketCode] = useState('');

  const [searchEmailAddress, setSearchEmailAddress] = useState('');

  const [searchPhoneNumber, setSearchPhoneNumber] = useState('');

  const scrollRef = useRef();

  const search = () => {
    let ticketsList = [...tickets];

    let searchCreatedStartValue = null;

    if (searchCreatedStart) {
      searchCreatedStartValue = dayjs(searchCreatedStart);
    }

    let searchCreatedEndValue = null;

    if (searchCreatedEnd) {
      searchCreatedEndValue = dayjs(searchCreatedEnd);
    }

    ticketsList = ticketsList.filter((item) => {
      if (searchParamKey) {
        if (
          !item.accountParamKey ||
          !item.accountParamKey.includes(searchParamKey.toLocaleUpperCase())
        ) {
          return false;
        }
      }

      if (searchCorporateName) {
        if (
          (!item.accountName ||
            !item.accountName.includes(searchCorporateName)) &&
          (!item.brokerAccountName ||
            !item.brokerAccountName.includes(searchCorporateName))
        ) {
          return false;
        }
      }

      if (searchCreatedStartValue) {
        if (!item.createdAt) {
          return false;
        } else {
          const createdDate = dayjs(item.createdAt);

          if (createdDate.isBefore(searchCreatedStartValue)) {
            return false;
          }
        }
      }

      if (searchCreatedEndValue) {
        if (!item.createdAt) {
          return false;
        } else {
          const createdDate = dayjs(item.createdAt);

          if (createdDate.isAfter(searchCreatedEndValue)) {
            return false;
          }
        }
      }

      if (searchTicketCode) {
        if (
          (!item.accountParamKey ||
            !item.accountParamKey.includes(
              searchTicketCode.toLocaleUpperCase()
            )) &&
          (!item.numberHint ||
            !item.numberHint.includes(searchTicketCode.toLocaleUpperCase()))
        ) {
          return false;
        }
      }

      if (searchEmailAddress) {
        if (
          (!item.email || !item.email.includes(searchEmailAddress)) &&
          (!item.additionalEmail1 ||
            !item.additionalEmail1.includes(searchEmailAddress)) &&
          (!item.additionalEmail2 ||
            !item.additionalEmail2.includes(searchEmailAddress))
        ) {
          return false;
        }
      }

      if (searchPhoneNumber) {
        if (
          !item.phoneNumber ||
          !item.phoneNumber.includes(searchPhoneNumber)
        ) {
          return false;
        }
      }

      return true;
    });

    setNextStartItemIndex(splitItemsLen);

    setFilteredTickets([...ticketsList]);
  };

  const showDetail = (id) => {
    const ticketData = tickets.find((item) => item.id === id);

    if (ticketData) {
      setTicketDetailDialog({
        show: true,
        ticket: {
          ...ticketData,
        },
      });
    }
  };

  const closeTicketDetailDialog = () => {
    setTicketDetailDialog({
      show: false,
      ticket: {},
    });
  };

  const changeDisableStatus = (value) => {
    setTicketDetailDialog((state) => {
      return {
        ...state,
        ticket: {
          ...state.ticket,
          disabled: value,
        },
      };
    });
  };

  const showExpiryDialog = (id, type) => {
    const ticketData = tickets.find((item) => item.id === id);

    if (ticketData) {
      setTicketExpiryDialog({
        show: true,
        type: type,
        ticket: {
          ...ticketData,
        },
      });
    }
  };

  const closeExpiryDialog = () => {
    setTicketExpiryDialog({
      show: false,
      type: '',
      ticket: {},
    });
  };

  const fetchTickets = useCallback(() => {
    firestore.collection('serviceTickets').onSnapshot((snapshot) => {
      const ticketsList = [];

      snapshot.forEach((doc) => {
        const docData = doc.data();

        ticketsList.push({
          id: doc.id,
          selected: false,
          ...docData,
        });
      });

      ticketsList.sort((a, b) => {
        if (a.salesAmount < b.salesAmount) {
          return -1;
        }
        if (a.salesAmount > b.salesAmount) {
          return 1;
        }

        return 0;
      });

      ticketsList.sort((a, b) => {
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        if (a.createdAt > b.createdAt) {
          return -1;
        }

        return 0;
      });

      setTickets(ticketsList);
    });
  }, []);

  useEffect(() => {
    if (show) {
      fetchTickets();
    }
  }, [fetchTickets, show]);

  useEffect(() => {
    const items = [];

    tickets.forEach((item) => {
      if (item) {
        items.push({
          ...item,
          selected: item.selected ? item.selected : false,
        });
      }
    });

    items.sort((a, b) => {
      if (a.timestamp < b.timestamp) {
        return 1;
      }
      if (a.timestamp > b.timestamp) {
        return -1;
      }

      return 0;
    });

    setFilteredTickets([...items]);
  }, [tickets]);

  const toggleCallSelected = (itemId) => {
    setFilteredTickets((state) => {
      const items = [...state];

      const targetIndex = items.findIndex((item) => item.id === itemId);

      if (targetIndex !== -1) {
        items[targetIndex].selected = !items[targetIndex].selected;
      }

      return [...items];
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

  const exportTicketsToCsv = ({ all }) => {
    let ticketsToExport = [];

    if (all) {
      ticketsToExport = [...filteredTickets];
    } else {
      ticketsToExport = [...filteredTickets.filter((item) => item.selected)];
    }

    if (ticketsToExport.length > 0) {
      const headers = [
        '日付,チケットコード,アカウント名,企業ID, 仲介企業名,仲介手数料(%),仲介手数料(円),携帯電話番号,利用可能時間(秒),通話時間(秒),定価,卸売価格,手数料(%),手数料(円),キャンセル',
      ];

      const body = [];

      ticketsToExport.forEach((d) => {
        const {
          createdAt,
          accountParamKey,
          numberHint,
          accountName,
          brokerAccountName,
          phoneNumber,
          duration,
          consumedSeconds,
          salesAmount,
          holesaleAmount,
          commissionPercentage,
          commission,
          brokerPercentage,
          brokerCommission,
          orderCanceled,
        } = d;

        body.push(
          [
            showDateTime(createdAt),
            showNumberHint(accountParamKey, numberHint),
            accountName,
            accountParamKey?.toLowerCase(),
            brokerAccountName,
            brokerPercentage,
            brokerCommission,
            phoneNumber,
            duration,
            consumedSeconds,
            salesAmount,
            holesaleAmount,
            commissionPercentage,
            commission,
            orderCanceled,
          ].join(',')
        );
      });

      downloadFile({
        data: [...headers, ...body].join('\n'),
        fileName: 'ticket_calls.csv',
        fileType: 'text/csv',
      });
    }
  };

  useEffect(() => {
    setFilteredTicketsShow(filteredTickets.slice(0, nextStartItemIndex));
  }, [filteredTickets, nextStartItemIndex]);

  const handleScroll = () => {
    if (scrollRef.current) {
      try {
        const scrollHeight = Math.round(scrollRef.current.scrollHeight);

        const scrollAmount = Math.round(scrollRef.current.scrollTop);

        const elementHeight = Math.round(scrollRef.current.clientHeight);

        // scroll reaches end
        if (scrollHeight - 50 < scrollAmount + elementHeight) {
          // update startIndex
          setNextStartItemIndex(nextStartItemIndex + splitItemsLen);
        }
      } catch {
        // do nothing
      }
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Box className={classes.root}>
        <TicketDetailDialog
          show={ticketDetailDialog.show}
          ticket={ticketDetailDialog.ticket}
          closeMethod={closeTicketDetailDialog}
          changeDisableStatus={changeDisableStatus}
        />

        <ExpiryDialog
          show={ticketExpirylDialog.show}
          type={ticketExpirylDialog.type}
          target={ticketExpirylDialog.ticket}
          closeMethod={closeExpiryDialog}
        />

        <Box>
          <Box className={classes.search}>
            <Box className={classes.searchArea}>
              <Box className={classes.searchGroup}>
                <p className={classes.searchTitle}>企業ID</p>
                <input
                  type="text"
                  value={searchParamKey}
                  className={classes.searchInput}
                  onChange={(e) => setSearchParamKey(e.target.value)}
                />
              </Box>
              <Box className={classes.searchGroup}>
                <p className={classes.searchTitle}>企業名/代理店名</p>
                <input
                  type="text"
                  value={searchCorporateName}
                  className={classes.searchInput}
                  onChange={(e) => setSearchCorporateName(e.target.value)}
                />
              </Box>
              <Box className={`${classes.searchGroup} ${classes.alertSpace}`}>
                <p className={classes.searchTitle}>購入日</p>
                <Box className={classes.searchDate}>
                  <FormControl variant="outlined">
                    <TextField
                      className={classes.inputDate}
                      variant="outlined"
                      type="datetime-local"
                      defaultValue={searchCreatedStart}
                      key={searchCreatedStart}
                      onSelect={(e) => setSearchCreatedStart(e.target.value)}
                      onBlur={(e) => setSearchCreatedStart(e.target.value)}
                      InputProps={{
                        inputProps: {
                          min: '2023-11-01T00:00',
                        },
                      }}
                    />
                  </FormControl>

                  <Typography variant="h6" className={classes.separator}>
                    ~
                  </Typography>

                  <FormControl variant="outlined">
                    <TextField
                      className={classes.inputDate}
                      variant="outlined"
                      type="datetime-local"
                      defaultValue={searchCreatedEnd}
                      key={searchCreatedEnd}
                      onSelect={(e) => setSearchCreatedEnd(e.target.value)}
                      onBlur={(e) => setSearchCreatedEnd(e.target.value)}
                      InputProps={{
                        inputProps: {
                          min: '2023-11-01T00:00',
                        },
                      }}
                    />
                  </FormControl>
                </Box>
              </Box>
              <Box className={classes.exportColumn}>
                <Box className={classes.exportButtonWrapper}>
                  <Button
                    className={classes.exportButton}
                    onClick={() => exportTicketsToCsv({ all: false })}
                  >
                    CSV出力
                  </Button>

                  <Button
                    className={classes.exportButton}
                    onClick={() => exportTicketsToCsv({ all: true })}
                  >
                    全データCSV出力
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box className={classes.searchArea}>
              <Box className={classes.searchGroup}>
                <p className={classes.searchTitle}>チケットコード</p>
                <input
                  type="text"
                  value={searchTicketCode}
                  className={classes.searchInput}
                  onChange={(e) => setSearchTicketCode(e.target.value)}
                />
              </Box>
              <Box className={classes.searchGroup}>
                <p className={classes.searchTitle}>メールアドレス</p>
                <input
                  type="text"
                  value={searchEmailAddress}
                  className={classes.searchInput}
                  onChange={(e) => setSearchEmailAddress(e.target.value)}
                />
              </Box>
              <Box className={classes.searchGroup}>
                <p className={classes.searchTitle}>購入者電話番号</p>
                <input
                  type="text"
                  value={searchPhoneNumber}
                  className={classes.searchInput}
                  onChange={(e) => setSearchPhoneNumber(e.target.value)}
                />
              </Box>
              <Box className={classes.searchGroupSearch}>
                <Button className={classes.searchBtn} onClick={search}>
                  <SearchIcon className={classes.searchIcon} />
                  <p>検　索</p>
                </Button>
              </Box>
            </Box>
          </Box>

          <Box
            className={classes.scrollBox}
            onScroll={handleScroll}
            ref={scrollRef}
          >
            <Box className={classes.scrollContent}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell> </TableCell>
                      <TableCell align="center">日付</TableCell>
                      <TableCell align="center">企業ID</TableCell>
                      <TableCell
                        align="center"
                        className={classes.companyNameCell}
                      >
                        企業名
                      </TableCell>
                      <TableCell align="center">チケットコード</TableCell>
                      <TableCell align="center">メールアドレス</TableCell>
                      <TableCell align="center">購入者電話番号</TableCell>
                      <TableCell align="center">有効期限</TableCell>
                      <TableCell align="center" className={classes.actionCell}>
                        操作
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTicketsShow.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell padding="checkbox" align="center">
                          <Checkbox
                            checked={row.selected}
                            inputProps={{
                              'aria-labelledby': `checkBox-${row.id}`,
                            }}
                            onClick={() => toggleCallSelected(row.id)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          {showDateTime(row.createdAt)}
                        </TableCell>
                        <TableCell align="center">
                          {row.accountParamKey?.toLowerCase()}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.companyNameCell}
                        >
                          {row.accountName}
                        </TableCell>
                        <TableCell align="center">
                          {row.orderCanceled
                            ? '購入キャンセル'
                            : showNumberHint(
                                row.accountParamKey,
                                row.numberHint
                              )}
                        </TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.phoneNumber}</TableCell>
                        <TableCell align="center">
                          {showExpiryTime(
                            row.expiryTimestamp,
                            row.expiryTimestampForUse
                          )}
                        </TableCell>
                        <TableCell align="left" className={classes.actionCell}>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => showDetail(row.id)}
                            className={classes.tableBtn}
                          >
                            詳細
                          </Button>
                          {(row.expiryTerm?.countFrom === 'use' ||
                            row.expiryTerm?.countFrom === 'pu' ||
                            row.expiryTerm?.countFrom === 'u') &&
                          !row.expiryTimestamp ? (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() =>
                                showExpiryDialog(row.id, 'useAndLogin')
                              }
                              className={`${classes.tableBtn} ${classes.firstExpiryBtn}`}
                            >
                              期限設定
                            </Button>
                          ) : (row.expiryTerm?.countFrom === 'use' ||
                              row.expiryTerm?.countFrom === 'pu' ||
                              row.expiryTerm?.countFrom === 'u') &&
                            row.duration === -1 ? (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => showExpiryDialog(row.id, 'expiry')}
                              className={`${classes.tableBtn} ${classes.expiryBtn}`}
                            >
                              期限変更
                            </Button>
                          ) : null}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {tickets > splitItemsLen &&
                filteredTickets.length !== filteredTicketsShow.length && (
                  <>
                    <li className={classes.circular}>
                      <CachedIcon className={classes.loadingIcon} />
                    </li>
                  </>
                )}
            </Box>
          </Box>
        </Box>
      </Box>
    </MuiThemeProvider>
  );
};

ServiceTickets.propTypes = {
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
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
  )(withStyles(styles)(ServiceTickets))
);
