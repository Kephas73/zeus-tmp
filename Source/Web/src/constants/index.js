const constants = {
  heightTableRow: 23,
  backgroundColorHead: '#929291',
  tableRowStyles: {
    container: {
      padding: '10px',
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
