import {withStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import constants from '../../../../constants';
import {makeStyles} from "@material-ui/core";

export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: constants.backgroundColorHead,
        color: theme.palette.common.white,
        width: '33.33%',
        height: '40px',
        padding: '0 8px',
        fontSize: 16,
    },
    body: {
        width: '33.33%',
        fontSize: 14,
        height: constants.heightTableRow,
        border: '1px solid var(--color-line-bland)',
        padding: '0px 16px',
        backgroundColor: 'var(--color-white)',
    },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export const useStyles = makeStyles({
    hostOperatorContainerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        borderBottom: '2px solid var(--color-line)',
        padding: '15px 5px 5px 15px',
    },
    hostPerformanceTextHeader: {
      fontSize: '13px',
      fontWeight: 600,
      color: 'var(--text-color-gray-bold)',
    },
    hostContainerHeaderOperator: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        padding: '15px 5px 5px 15px',
    },
    hostPerformanceText: {
        fontWeight: 400,
        color: 'var(--text-color-gray-bland)',
    },
    hostButtonSetting: {
        backgroundColor: 'var(--color-green)',
        padding: '4px 25px',
        border: 'none',
        borderRadius: '5px',
        color: 'var(--color-white)',
        fontSize: '12px',
    },
    hostInputOperator: {
        padding: '0 20px 0 20px',
        width: '56%',
    },
    hostTextInputOperator: {
        padding: '0',
        width: '100%',
        '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            borderColor: 'var(--text-color-gray-bold)',
            padding: '0',
            height: '25px',
        },
    },
    hostButtonCSV: {
        padding: '2px 25px',
        backgroundColor: 'var(--background-color-btn-csv)',
        border: 'none',
        borderRadius: '5px',
        color: 'var(--color-white)',
        cursor: 'pointer',
        fontSize: '12px',
    },
    tableOperator: {
        marginTop: '10px',
        minWidth: '550px',
        boxShadow: '0px 4px 6px -2px var(--text-color-gray-bland)',
        borderRadius: '8px',
    },
    operatorContainer: {
        padding: '10px',
    },
    option: {
        color: 'var(--text-color-gray-bold)',
        fontSize: '14px',
        '& .MuiOutlinedInput-input': {
            padding: '0 0 0 10px',
            backgroundColor: 'var(--color-white)'
        },
    },
    optionInput: {
        padding: '0 0 0 10px',
        backgroundColor: 'var(--color-white)',
    },
    cellHead: {
        borderRight: '1px solid var(--text-color-gray-bland)',
    },
    lastRow: {
        marginTop: '10px',
        '& td': {
            borderBottom: '2px solid var(--color-line)',
        },
    },
    categoryCell: {
        borderBottom: '2px solid var(--color-line)',
    },
    hostGlobalText: {
        '& td': {
            color: 'var(--text-color-gray)'
        },
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
        '&.host-table-row th:first-child': {
            borderRadius: '8px 0px 0px 0px',
        },
        '&.host-table-row th:last-child': {
            borderRadius: '0px 8px 0px 0px',
        },
        '&.host-table-row-skill th:first-child': {
            borderRadius: '10px 0px 0px 0px',
        },
        '&.host-table-row-skill th:last-child': {
            borderRadius: '0px 10px 0px 0px',
        },
    },
});
