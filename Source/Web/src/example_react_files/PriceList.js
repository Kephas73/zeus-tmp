import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withStyles,
  createTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import { withRoomContext } from '../../../../RoomContext';

import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { showTaxIncludedAmount } from '../../../../utils';

const styles = () => ({
  root: {
    width: '100%',
    minWidth: '400px',
    position: 'relative',
    padding: '15px 20px',
    color: 'var(--text-color)',
    margin: 'auto',
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    margin: '25px 0',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#292929',
  },
  information: {
    width: '100%',
    maxWidth: '800px',
    textAlign: 'start',
    fontSize: '0.8rem',
    color: 'var(--text-color)',
  },
  sectionBox: {
    width: '100%',
    margin: '20px 0 0 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  sectionTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    paddingLeft: '20px',
    height: '35px',
    lineHeight: '35px',
    borderLeft: '6px solid #484A46',
    color: '#292929',
    width: '100%',
    maxWidth: '800px',
  },
  singleLinePriceList: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    maxWidth: '800px',
  },
  priceListColumn: {
    marginTop: '15px',
    marginBottom: '15px',
  },
  priceListColumnLeft: {
    marginRight: '20px',
  },
  priceListBoxTitle: {
    color: '#cd2c82',
    fontSize: '0.9rem',
  },
  priceBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'flex-start',
    border: '1px solid #292929',
    borderRadius: '10px',
    width: 'fit-content',
  },
  priceListLine: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    '&:last-child > div': {
      borderBottom: 'none !important',
    },
    '&:first-child': {
      backgroundColor: '#cd2c82',
      borderTopLeftRadius: '9px',
      borderTopRightRadius: '9px',
    },
    '&:first-child > div': {
      color: '#FFF',
    },
  },
  priceListItem: {
    display: 'flex',
    justifyContent: 'center',
    padding: '5px 10px',
    color: '#292929',
    borderBottom: '1px solid #292929',
    fontSize: '0.9rem',
    fontFamily:
      '"Hiragino Kaku Gothic Pro","Hiragino Kaku Gothic ProN","Hiragino Sans","Meiryo",Arial,sans-serif',
  },
  priceItem: {
    textAlign: 'center',
    height: '38px',
    lineHeight: '38px',
    color: '#292929',
    fontSize: '1rem',
  },
  priceItemLeft: {
    width: '45%',
    minWidth: '158px',
    borderRight: '1px solid #292929',
  },
  priceItemRight: {
    width: '55%',
    minWidth: '193px',
  },
  priceChangeLink: {
    textDecoration: 'underline',
  },
});

const theme = createTheme({
  typography: {
    fontFamily:
      '"Hiragino Kaku Gothic Pro","Hiragino Kaku Gothic ProN","Hiragino Sans","Meiryo",Arial,sans-serif',
  },
});

const showExpiryDays = (term) => {
  if (term === 0) {
    return '-';
  } else if (term === 7) {
    return '1WEEK';
  } else if (term === 1) {
    return '1DAY';
  } else {
    return `${term}DAYS`;
  }
};

const showExpiryTerm = (term) => {
  if (!term) {
    return '';
  } else if (Number(term.value) === 0) {
    return '無期限';
  } else {
    return `${term.value}${term.type === 'year' ? '年' : term.type === 'month' ? 'ヶ月' : '日'}`;
  }
};

const pricelistBreaklineWidth = 1100;

const PriceList = ({ classes, serviceAccount, priceLists, drawerWidth }) => {
  const [singleLinePriceList, setSingleLinePriceList] = useState(
    window.matchMedia(`(min-width: ${pricelistBreaklineWidth + drawerWidth}px)`)
      .matches
  );

  useEffect(() => {
    window
      .matchMedia(`(min-width: ${pricelistBreaklineWidth + drawerWidth}px)`)
      .addEventListener('change', (e) => setSingleLinePriceList(e.matches));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Box className={classes.root}>
        <Box className={classes.pageHeader}>
          <Typography className={classes.title}>プライスリスト</Typography>
        </Box>

        <Box className={classes.sectionBox}>
          <Typography className={classes.sectionTitle}>
            利用者販売価格
          </Typography>
          <Typography className={classes.information}>
            プライスリストの変更が必要な場合は、
            <Link
              to={{
                pathname: 'https://www.tuuyaku.com/corporate-inquiries',
              }}
              target="_blank"
              className={classes.priceChangeLink}
            >
              こちら
            </Link>
            からお問い合わせください
          </Typography>
          <Box
            className={singleLinePriceList ? classes.singleLinePriceList : ''}
          >
            {priceLists.priceListCustomer &&
              priceLists.priceListCustomer.length > 0 && (
                <Box
                  className={`${classes.priceListColumn} ${classes.priceListColumnLeft}`}
                >
                  <Typography className={classes.priceListBoxTitle}>
                    購入後有効期限:
                    {showExpiryTerm(serviceAccount.defaultExpiryTerm)}
                  </Typography>
                  <Box className={classes.priceBox}>
                    <Box className={classes.priceListLine}>
                      <Box
                        className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                      >
                        利用分数
                      </Box>
                      <Box
                        className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                      >
                        有効期限
                        <br />
                        (コード入力後)
                      </Box>
                      <Box
                        className={`${classes.priceListItem} ${classes.priceItemRight}`}
                      >
                        料金(税込)
                      </Box>
                    </Box>
                    {priceLists.priceListCustomer.map((item, index) => (
                      <Box className={classes.priceListLine} key={index}>
                        <Box
                          className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                        >
                          {item.minutes === -1
                            ? '使い放題'
                            : `${item.minutes}分`}
                        </Box>
                        <Box
                          className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                        >
                          {showExpiryTerm(item.expiryTermAfterUse)}
                        </Box>
                        <Box
                          className={`${classes.priceListItem} ${classes.priceItemRight}`}
                        >
                          {showTaxIncludedAmount(item.salesAmount)}
                          円(税込)
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

            {priceLists.priceListExpireAfterUseCustomer &&
              priceLists.priceListExpireAfterUseCustomer.length > 0 && (
                <Box className={classes.priceListColumn}>
                  <Typography className={classes.priceListBoxTitle}>
                    購入後有効期限なし
                  </Typography>
                  <Box className={classes.priceBox}>
                    <Box className={classes.priceListLine}>
                      <Box
                        className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                      >
                        利用分数
                      </Box>
                      <Box
                        className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                      >
                        有効期限
                        <br />
                        (コード入力後)
                      </Box>
                      <Box
                        className={`${classes.priceListItem} ${classes.priceItemRight}`}
                      >
                        料金(税込)
                      </Box>
                    </Box>
                    {priceLists.priceListExpireAfterUseCustomer.map(
                      (item, index) => (
                        <Box className={classes.priceListLine} key={index}>
                          <Box
                            className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                          >
                            {item.minutes === -1
                              ? '使い放題'
                              : `${item.minutes}分`}
                          </Box>
                          <Box
                            className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                          >
                            {showExpiryTerm(item.expiryTermAfterUse)}
                          </Box>
                          <Box
                            className={`${classes.priceListItem} ${classes.priceItemRight}`}
                          >
                            {showTaxIncludedAmount(item.salesAmount)}
                            円(税込)
                          </Box>
                        </Box>
                      )
                    )}
                  </Box>
                </Box>
              )}
          </Box>

          {priceLists.priceListTermCustomer &&
            priceLists.priceListTermCustomer.length > 0 && (
              <Box>
                <Box className={classes.priceListColumn}>
                  <Typography className={classes.priceListBoxTitle}>
                    購入後有効期限別
                  </Typography>
                  <Box className={classes.priceBox}>
                    <Box className={classes.priceListLine}>
                      <Box
                        className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                      >
                        利用期間(分数)
                      </Box>
                      <Box
                        className={`${classes.priceListItem} ${classes.priceItemRight}`}
                      >
                        料金(税込)
                      </Box>
                    </Box>
                    {priceLists.priceListTermCustomer.map((item, index) => (
                      <Box className={classes.priceListLine} key={index}>
                        <Box
                          className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                        >
                          {showExpiryDays(item.expiryTerm.value)}(
                          {item.minutes === -1
                            ? '使い放題'
                            : `${item.minutes}分`}
                          )
                        </Box>
                        <Box
                          className={`${classes.priceListItem} ${classes.priceItemRight}`}
                        >
                          {showTaxIncludedAmount(item.salesAmount)}
                          円(税込)
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            )}
        </Box>

        <Box className={classes.sectionBox}>
          <Typography className={classes.sectionTitle}>
            登録企業販売価格(卸売り価格)
          </Typography>
          <Box
            className={singleLinePriceList ? classes.singleLinePriceList : ''}
          >
            {priceLists.priceList && priceLists.priceList.length > 0 && (
              <Box
                className={`${classes.priceListColumn} ${classes.priceListColumnLeft}`}
              >
                <Typography className={classes.priceListBoxTitle}>
                  購入後有効期限:
                  {showExpiryTerm(serviceAccount.defaultExpiryTerm)}
                </Typography>
                <Box className={classes.priceBox}>
                  <Box className={classes.priceListLine}>
                    <Box
                      className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                    >
                      利用分数
                    </Box>
                    <Box
                      className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                    >
                      有効期限
                      <br />
                      (コード入力後)
                    </Box>
                    <Box
                      className={`${classes.priceListItem} ${classes.priceItemRight}`}
                    >
                      料金(税込)
                    </Box>
                  </Box>
                  {priceLists.priceList.map((item, index) => (
                    <Box className={classes.priceListLine} key={index}>
                      <Box
                        className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                      >
                        {item.minutes === -1 ? '使い放題' : `${item.minutes}分`}
                      </Box>
                      <Box
                        className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                      >
                        {showExpiryTerm(item.expiryTermAfterUse)}
                      </Box>
                      <Box
                        className={`${classes.priceListItem} ${classes.priceItemRight}`}
                      >
                        {showTaxIncludedAmount(item.holesaleAmount)}
                        円(税込)
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {priceLists.priceListExpireAfterUse &&
              priceLists.priceListExpireAfterUse.length > 0 && (
                <Box className={classes.priceListColumn}>
                  <Typography className={classes.priceListBoxTitle}>
                    購入後有効期限なし
                  </Typography>
                  <Box className={classes.priceBox}>
                    <Box className={classes.priceListLine}>
                      <Box
                        className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                      >
                        利用分数
                      </Box>
                      <Box
                        className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                      >
                        有効期限
                        <br />
                        (コード入力後)
                      </Box>
                      <Box
                        className={`${classes.priceListItem} ${classes.priceItemRight}`}
                      >
                        料金(税込)
                      </Box>
                    </Box>
                    {priceLists.priceListExpireAfterUse.map((item, index) => (
                      <Box className={classes.priceListLine} key={index}>
                        <Box
                          className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                        >
                          {item.minutes === -1
                            ? '使い放題'
                            : `${item.minutes}分`}
                        </Box>
                        <Box
                          className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                        >
                          {showExpiryTerm(item.expiryTermAfterUse)}
                        </Box>
                        <Box
                          className={`${classes.priceListItem} ${classes.priceItemRight}`}
                        >
                          {showTaxIncludedAmount(item.holesaleAmount)}
                          円(税込)
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
          </Box>

          {priceLists.priceListTerm && priceLists.priceListTerm.length > 0 && (
            <Box>
              <Box className={classes.priceListColumn}>
                <Typography className={classes.priceListBoxTitle}>
                  購入後有効期限別
                </Typography>
                <Box className={classes.priceBox}>
                  <Box className={classes.priceListLine}>
                    <Box
                      className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                    >
                      利用期間(分数)
                    </Box>
                    <Box
                      className={`${classes.priceListItem} ${classes.priceItemRight}`}
                    >
                      料金(税込)
                    </Box>
                  </Box>
                  {priceLists.priceListTerm.map((item, index) => (
                    <Box className={classes.priceListLine} key={index}>
                      <Box
                        className={`${classes.priceListItem} ${classes.priceItemLeft}`}
                      >
                        {showExpiryDays(item.expiryTerm.value)}(
                        {item.minutes === -1 ? '使い放題' : `${item.minutes}分`}
                        )
                      </Box>
                      <Box
                        className={`${classes.priceListItem} ${classes.priceItemRight}`}
                      >
                        {showTaxIncludedAmount(item.holesaleAmount)}
                        円(税込)
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </MuiThemeProvider>
  );
};

PriceList.propTypes = {
  classes: PropTypes.object.isRequired,
  serviceAccount: PropTypes.object,
  priceLists: PropTypes.array.isRequired,
  drawerWidth: PropTypes.number,
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
  )(withStyles(styles)(PriceList))
);
