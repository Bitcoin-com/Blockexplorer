import cookies from 'next-cookies';
import { setCurrency, setLanguage, setAdvanced } from '~/preferences/actions';

export const useCookies = (ctx) => {
  const { 
    'bitcoin.currency': currency,
    'bitcoin.language': language,
    'bitcoin.show_advanced': showAdvanced,
  } = cookies(ctx);

  const { store } = ctx;
  const { dispatch } = store;

  if (currency) {
    dispatch(setCurrency(currency));
  }

  if (language) {
    dispatch(setLanguage(language));
  }

  if (showAdvanced !== undefined) {
    dispatch(setAdvanced(showAdvanced));
  }
}

