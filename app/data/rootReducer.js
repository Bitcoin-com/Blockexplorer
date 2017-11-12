import { combineReducers } from 'redux'
import { i18nReducer } from 'react-redux-i18n';

import core from '~/core/reducer';
import preferences from '~/preferences/reducer';
import chains from '~/chains/reducer';

export default combineReducers({
  core,
  preferences,
  chains,
  i18n: i18nReducer,
})
