import React, { useRef, useState } from 'react';

import DatePickerMonthDay from './DatePickerMonthDay';
import DatePickerYearMonth from './DatePickerYearMonth';
import { useYearMonthEffect, useMonthDayEffect } from './operator.hooks';
import { exportToCSV } from '../../../../utils/exportCSV';
import useRow from './prepareData';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './operator.css';
import { calls } from '../../../../data/calls';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { StyledTableCell, StyledTableRow } from './style';

export default function Index() {
  const tableRef = useRef(null);

  const [dataOverallYearMonth, setDataOverallYearMonth] = useState({
    numberOfIncomingCalls: 0,
    numberOfCallsReceived: 0,
    callReceivedRate: 0,
    upTime: 0,
    totalTalkTime: 0,
    averageTalkTime: 0,
  });

  const [dataOverallMonthDay, setDataOverallMonthDay] = useState({
    numberOfIncomingCalls: 0,
    numberOfCallsReceived: 0,
    callReceivedRate: 0,
    upTime: 0,
    totalTalkTime: 0,
    averageTalkTime: 0,
  });

  const [dateYearMonth, setDateYearMonth] = useState(new Date());
  const [dateMonthDay, setDateMonthDay] = useState(new Date());
  const [hostId, setHostId] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const rows = useRow(dataOverallYearMonth, dataOverallMonthDay, filteredData);

  const uniqueHostIds = Array.from(new Set(calls.map(call => call.hostId))).filter(id => id);

  const handleSearch = () => {
    const filteredCalls = calls.filter((item) => item.hostId === hostId);
    setFilteredData(filteredCalls);
  };

  useYearMonthEffect(filteredData, dateYearMonth, setDataOverallYearMonth);
  useMonthDayEffect(filteredData, dateMonthDay, setDataOverallMonthDay);

  return (
      <TableContainer component={Paper} className='operator-container'>
        <div className="host-operator-container-header">
          <div className="host-performance-text">オペレータパフォーマンス</div>
          <button
            className="host-button-csv"
            onClick={() => exportToCSV(rows, 'FileCSV.csv', dateYearMonth, dateMonthDay)}
          >CSV 出力</button>
        </div>

        <div className="host-container-header-operator">
          <div className="host-performance-text">オペレータ ID</div>
          <div className="host-input-operator">
            <FormControl variant="outlined" className="host-text-input-operator">
              <Select
                native
                className='option'
                value={hostId}
                onChange={(e) => setHostId(e.target.value)}
                inputProps={{
                  name: 'Host login ID',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option key={'default'} value={''} disabled>
                  オペレータ ID
                </option>
                {uniqueHostIds.map(id => (
                  <option key={id} className='option' value={id}>
                    {id}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
          <button
              className="host-button-setting"
              onClick={handleSearch}
            >
              設定
            </button>
          </div>
        </div>
        <Table className='table-operator' aria-label="customized table" ref={tableRef}>
          <TableHead className="host-custom-date-picker">
            <TableRow className="host-header-operator host-table-row">
              <StyledTableCell className='cell-head'>項目</StyledTableCell>
              <StyledTableCell className='cell-head' align="right" >
                <div>
                  <DatePickerYearMonth
                    dateYearMonth={dateYearMonth}
                    setDateYearMonth={setDateYearMonth}
                  />
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div>
                  <DatePickerMonthDay dateMonthDay={dateMonthDay} setDateMonthDay={setDateMonthDay} />
                </div>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className="host-global-text">
            {rows.map((group) =>
              group.map((data, dataIndex) => {
                const isLastRow = dataIndex === group.length - 1;
                return (
                  <StyledTableRow key={data.name} className={isLastRow ? 'last-row' : ''}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      className={isLastRow ? 'category-cell' : ''}
                    >
                      {data.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{data.metric1}</StyledTableCell>
                    <StyledTableCell align="right">{data.metric2}</StyledTableCell>
                  </StyledTableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
