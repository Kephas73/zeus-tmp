import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import DatePickerDayMonthYear from './DatePickerDayMonthYear';
import DatePickerDayMonthYearPlusOneMonth from './DatePickerDayMonthYearPlusOneMonth';

import constants from '../../../../constants';
import { exportToCSVSkill } from '../../../../utils/exportCSV';
import { formatDataForLanguages } from './caculator';

const styles = () => ({
  hostContainerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    borderBottom: '2px solid var(--color-line)',
    padding: '15px 5px 5px 20px',
    marginBottom: '14px',
  },
  hostLanguages: {
    padding: '4px',
    backgroundColor: 'var(--color-white)',
    borderRadius: '2px',
    marginRight: '5px',
    color: 'var(--color-languages)',
    fontSize: '10px',
  },
  hostButtonCsv: {
    padding: '2px 25px',
    backgroundColor: 'var(--background-color-btn-csv)',
    border: 'none',
    borderRadius: '5px',
    color: 'var(--color-white)',
    cursor: 'pointer',
    fontSize: '12px',
  },
  hostContainerDateTime: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '0px 5px 0px 20px',
  },
  hostTextFilter: {
    color: 'var(--text-color-gray-bland)',
    marginRight: '15px',
    paddingTop: '40px',
  },
  hostTableRowSkillItemColumn: {
    minWidth: '150px',
    borderRight: '1px solid var(--text-color-gray-bland)',
  },
  hostTableRowSkillLanguageColumn: {
    borderRight: '1px solid var(--text-color-gray-bland)',
    width: 'calc(100% / 6.5)',
    '&:last-child': {
      borderRight: 'none',
    },
  },
  hostTildeFilter: {
    fontSize: '50px',
    color: 'var(--text-color-gray-bland)',
  },
  hostDropIcon: {
    color: 'var(--text-color-gray-bold)',
  },
  hostGlobalText: {
    '& th, & td': {
      color: 'var(--text-color-gray)',
    },
    '& tr:nth-of-type(3), & tr:nth-of-type(7), & tr:nth-of-type(9)': {
      border: 'unset',
      borderBottom: '2px solid var(--color-line)',
    },
  },
  tableContainerScroll: {
    width: '100% !important',
    overflow: 'auto !important',
    padding: '6px 8px 10px',
  },
  customTableBody: {
    width: '100%',
    padding: '10px',
    boxShadow: '0px 4px 6px -2px var(--text-color-gray-bland)',
  },
  tableHead: {
    borderRadius: '10px 0px 0px 0px',
  },
  tableHeadLastChild: {
    borderRadius: '0px 10px 0px 0px',
  },
  cellHeadLastChild: {
    borderRight: '0px solid var(--text-color-gray-bland) !important',
  },
  hostContainerNav: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  hostCustomDatePicker: {
    '& .MuiTableCell-root': {
      padding: '0px 16px !important',
    },
    '& .MuiInputBase-root': {
      padding: '4px !important',
      marginTop: '0px !important',
    },
    '& .MuiFormControl-root': {
      marginTop: '12px !important',
      marginBottom: '7px !important',
    },
  },
  hostTableRow: {
    '& th:first-child': {
      borderRadius: '8px 0px 0px 0px',
    },
    '& th:last-child': {
      borderRadius: '0px 8px 0px 0px',
    },
  },
  hostTableRowSkill: {
    '& th:first-child': {
      borderRadius: '10px 0px 0px 0px',
    },
    '& th:last-child': {
      borderRadius: '0px 10px 0px 0px',
    },
  },
  hostPerformanceText: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-color-gray-bold)',
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: constants.backgroundColorHead,
    color: theme.palette.common.white,
    border: '1px solid var(--color-white)',
  },
  body: {
    fontSize: 14,
    height: constants.heightTableRow,
    border: '1px solid var(--color-line-bland)',
    padding: '0px 16px',
    backgroundColor: 'var(--color-white)',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function Skill({ classes }) {
  const [dataSkillDateTime, setDataSkillDateTime] = useState({});
  const [fromDateTime, setFromDateTime] = useState(new Date());
  const [toDateTime, setToDateTime] = useState(new Date());

  useEffect(() => {
    const data = formatDataForLanguages(fromDateTime, toDateTime);
    setDataSkillDateTime(data);
  }, [fromDateTime, toDateTime]);

  const renderTableRows = () => {
    if (!dataSkillDateTime || Object.keys(dataSkillDateTime).length === 0) return null;

    const firstLanguage = Object.keys(dataSkillDateTime)[0];
    const keys = Object.keys(dataSkillDateTime[firstLanguage]);

    return keys.map((key) => (
      <StyledTableRow key={key}>
        <StyledTableCell component="th" scope="row">
          {key}
        </StyledTableCell>
        <StyledTableCell align="right">{dataSkillDateTime.ENGLISH[key]}</StyledTableCell>
        <StyledTableCell align="right">{dataSkillDateTime.CHINESE[key]}</StyledTableCell>
        <StyledTableCell align="right">{dataSkillDateTime.KOREAN[key]}</StyledTableCell>
        <StyledTableCell align="right">{dataSkillDateTime.SPAIN[key]}</StyledTableCell>
        <StyledTableCell align="right">{dataSkillDateTime.PORTUGAL[key]}</StyledTableCell>
      </StyledTableRow>
    ));
  };

  return (
    <div className="host-container">
      <TableContainer component={Paper} className={`${classes.tableContainerScroll}`}>
        <div className={classes.hostContainerHeader}>
          <div className={classes.hostPerformanceText}>スキル別パフォーマンス</div>
          <button
            className={classes.hostButtonCsv}
            onClick={() =>
              exportToCSVSkill(dataSkillDateTime, 'data-host-skill.csv', fromDateTime, toDateTime)
            }
          >
            CSV 出力
          </button>
        </div>
        <div className={classes.hostContainerDateTime}>
          <div className={classes.hostTextFilter}>期間指定</div>
          <div>
            <DatePickerDayMonthYear value={fromDateTime} setFromDateTime={setFromDateTime} />
          </div>
          <div className={classes.hostTildeFilter}>~</div>
          <div>
            <DatePickerDayMonthYearPlusOneMonth value={toDateTime} setToDateTime={setToDateTime} />
          </div>
        </div>
        <Table className={`${classes.customTableBody}`} aria-label="customized table">
          <TableHead>
            <TableRow className={classes.hostTableRow}>
              <StyledTableCell className={classes.hostTableRowSkillItemColumn}>
                項目
              </StyledTableCell>
              <StyledTableCell className={classes.hostTableRowSkillLanguageColumn} align="center">
                <div>
                  <span className={classes.hostLanguages}>EN</span>
                  <span>英語</span>
                </div>
              </StyledTableCell>
              <StyledTableCell className={classes.hostTableRowSkillLanguageColumn} align="center">
                <div>
                  <span className={classes.hostLanguages}>CN</span>
                  <span>中国語</span>
                </div>
              </StyledTableCell>
              <StyledTableCell className={classes.hostTableRowSkillLanguageColumn} align="center">
                <div>
                  <span className={classes.hostLanguages}>KR</span>
                  <span>韓国語</span>
                </div>
              </StyledTableCell>
              <StyledTableCell className={classes.hostTableRowSkillLanguageColumn} align="center">
                <div>
                  <span className={classes.hostLanguages}>ES</span>
                  <span>スペイン語</span>
                </div>
              </StyledTableCell>
              <StyledTableCell className={classes.hostTableRowSkillLanguageColumn} align="center">
                <div>
                  <span className={classes.hostLanguages}>PT</span>
                  <span>ポルトガル語</span>
                </div>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.hostGlobalText}>{renderTableRows()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default withStyles(styles)(Skill);
