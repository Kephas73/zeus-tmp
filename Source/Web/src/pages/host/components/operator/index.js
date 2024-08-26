import React, {useRef, useState} from 'react';

import {useYearMonthEffect, useMonthDayEffect} from './operator.hooks';
import DatePickerMonthDay from './DatePickerMonthDay';
import DatePickerYearMonth from './DatePickerYearMonth';
import {exportToCSV} from '../../../../utils/exportCSV';
import prepareData from './prepareData';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// import './operator.css';
import {calls} from '../../../../data/calls';
import {StyledTableCell, StyledTableRow, useStyles} from './style';

export default function Operator() {
    const tableRef = useRef(null);
    const classes = useStyles();
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

    const rows = prepareData(dataOverallYearMonth, dataOverallMonthDay, filteredData);

    const uniqueHostIds = Array.from(new Set(calls.map((call) => call.hostLoginId))).filter((id) => id);

    const handleSearch = () => {
        const filteredCalls = calls.filter((item) => item.hostLoginId === hostId);
        setFilteredData(filteredCalls);
    };

    useYearMonthEffect(filteredData, dateYearMonth, setDataOverallYearMonth);
    useMonthDayEffect(filteredData, dateMonthDay, setDataOverallMonthDay);

    return (
        <TableContainer component={Paper} className={classes.operatorContainer}>
            <div className={classes.hostOperatorContainerHeader}>
                <div className={classes.hostPerformanceTextHeader}>オペレータパフォーマンス</div>
                <button
                    className={classes.hostButtonCSV}
                    onClick={() => exportToCSV(rows, 'FileCSV.csv', dateYearMonth, dateMonthDay)}
                >
                    CSV 出力
                </button>
            </div>

            <div className={classes.hostContainerHeaderOperator}>
                <div className={classes.hostPerformanceText}>オペレータ ID</div>
                <div className={classes.hostInputOperator}>
                    <FormControl variant="outlined" className={classes.hostTextInputOperator}>
                        <Select
                            native
                            className={classes.option}
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
                            {uniqueHostIds.map((id) => (
                                <option key={id} className={classes.optionInput} value={id}>
                                    {id}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <button className={classes.hostButtonSetting} onClick={handleSearch}>
                        設定
                    </button>
                </div>
            </div>
            <Table className={classes.tableOperator} aria-label="customized table" ref={tableRef}>
                <TableHead className={classes.hostCustomDatePicker}>
                    <TableRow className={classes.hostTableRow}>
                        <StyledTableCell className={classes.cellHead}>項目</StyledTableCell>
                        <StyledTableCell className={classes.cellHead} align="right">
                            <div>
                                <DatePickerYearMonth
                                    dateYearMonth={dateYearMonth}
                                    setDateYearMonth={setDateYearMonth}
                                />
                            </div>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <div>
                                <DatePickerMonthDay dateMonthDay={dateMonthDay} setDateMonthDay={setDateMonthDay}/>
                            </div>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody className={classes.hostGlobalText}>
                    {rows.map((group) =>
                        group.map((data, dataIndex) => {
                            const isLastRow = dataIndex === group.length - 1;
                            return (
                                <StyledTableRow key={data.name} className={isLastRow ? classes.lastRow : ''}>
                                    <StyledTableCell
                                        component="th"
                                        scope="row"
                                        className={isLastRow ? classes.categoryCell : ''}
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
