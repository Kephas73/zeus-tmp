const constants = {
  heightTableRow: 23,
  backgroundColorHead: '#929291',
  tableRowStyles: {
    container: {
      padding: '10px',
    },
    cellHead: {
      borderRight: '1px solid #c3c3c3',
    },
    head: {
        borderRadius: '5px',
    },
    table: {
      marginTop: '10px',
      minWidth: 700,
      boxShadow: '2px 2px #d7d7d7',
    },
    lastRow: {
      '& tr': {
        marginTop: '10px',  
      },
      '& td': {
        borderBottom: '2px solid #a7a7a7',
      },
    },
    categoryCell: {
      borderBottom: '2px solid #a7a7a7',
    },
  },
};

export default constants;
