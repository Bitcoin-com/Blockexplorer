import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { 
  loadTranslations, 
  setLocale, 
  syncTranslationWithStore, 
} from 'react-redux-i18n';

import reducer from './rootReducer';
import translationsObject from '../../locale';

const DEFAULT_LANGUAGE = 'en';

const INITIAL_STATE = {
  preferences: {
    chain: "bch",
    currency: "bch",
  },
  i18n: {
    locale: DEFAULT_LANGUAGE,
  },
};

const initStore = (initialState = INITIAL_STATE) => {
  const store = createStore(
    reducer, 
    initialState,
    applyMiddleware(thunk),
  )

  syncTranslationWithStore(store)
  store.dispatch(loadTranslations(translationsObject));

  return store;
}

export default initStore;

