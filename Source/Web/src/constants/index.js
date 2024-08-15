const constants = {
  heightTableRow: 23,
  backgroundColorHead: '#929291',
  tableRowStyles: {
    container: {
      padding: '10px',
    },
    cellHead: {
      borderRight: '1px solid var(--text-color-gray-bland)',
    },
    head: {
        borderRadius: '5px',
    },
    table: {
      marginTop: '10px',
      minWidth: 700,
      boxShadow: '2px 2px var(--text-color-gray-bland)',
      borderRadius: '8px',
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
