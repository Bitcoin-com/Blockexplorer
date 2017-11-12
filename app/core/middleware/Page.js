import React from 'react';

import withRedux from 'next-redux-wrapper'
import initStore from '~/data/store';
import PageWithIntl from './PageWithIntl';

export default (Page, mapStateToProps) => {
  // Needed for money formatting:
  const IntlPage = PageWithIntl(Page);

  return withRedux(initStore, mapStateToProps)(IntlPage);
}

