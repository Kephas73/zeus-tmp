import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './skill.css';
import constants from '../../../../constants';
import DatePickerDayMonthYear from './DatePickerDayMonthYear';
import { exportToCSVSkill } from '../../../../utils/exportCSV';
import { formatDataForLanguages } from './caculator';
import DatePickerDayMonthYearPlusOneMonth from './DatePickerDayMonthYearPlusOneMonth';

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

const useStyles = makeStyles(constants.tableRowStyles);

export default function Skill() {
  const classes = useStyles();

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
      <TableContainer component={Paper} className={`table-container-scroll ${classes.container}`}>
        <div className="host-container-header">
          <div className="host-performance-text">スキル別パフォーマンス</div>
          <button
            className="host-button-csv"
            onClick={() =>
              exportToCSVSkill(dataSkillDateTime, 'data-host-skill.csv', fromDateTime, toDateTime)
            }
          >
            CSV 出力
          </button>
        </div>
        <div className="host-container-dateTime">
          <div className="host-text-filter">期間指定</div>
          <div>
            <DatePickerDayMonthYear value={fromDateTime} setFromDateTime={setFromDateTime} />
          </div>
          <div className="host-tilde-filter">~</div>
          <div>
            <DatePickerDayMonthYearPlusOneMonth value={toDateTime} setToDateTime={setToDateTime} />
          </div>
        </div>
        <Table className={`${classes.table} custom-tableBody`} aria-label="customized table">
          <TableHead>
            <TableRow className="host-table-row-skill">
              <StyledTableCell className={`${classes.cellHead} item-column`}>項目</StyledTableCell>
              <StyledTableCell className={`${classes.cellHead} language-column`} align="center">
                <div>
                  <span className="host-languages">EN</span>
                  <span>英語</span>
                </div>
              </StyledTableCell>
              <StyledTableCell className={`${classes.cellHead} language-column`} align="center">
                <div>
                  <span className="host-languages">CN</span>
                  <span>中国語</span>
                </div>
              </StyledTableCell>
              <StyledTableCell className={`${classes.cellHead} language-column`} align="center">
                <div>
                  <span className="host-languages">KR</span>
                  <span>韓国語</span>
                </div>
              </StyledTableCell>
              <StyledTableCell className={`${classes.cellHead} language-column`} align="center">
                <div>
                  <span className="host-languages">ES</span>
                  <span>スペイン語</span>
                </div>
              </StyledTableCell>
              <StyledTableCell className={`${classes.cellHead} language-column`} align="center">
                <div>
                  <span className="host-languages">PT</span>
                  <span>ポルトガル語</span>
                </div>
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody className="host-global-text host-global-text-skill">
            {renderTableRows()}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
