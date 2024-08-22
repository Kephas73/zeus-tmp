const constants = {
  heightTableRow: 23,
  backgroundColorHead: 'var(--background-color-gray)',
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
      boxShadow: '0px 4px 6px -2px var(--text-color-gray-bland)',
      borderRadius: '8px',
    },
    lastRow: {
      '& tr': {
        marginTop: '10px',
      },
      '& td': {
        borderBottom: '2px solid var(--color-line)',
      },
    },
    categoryCell: {
      borderBottom: '2px solid var(--color-line)',
    },
  },
};

export default constants;
