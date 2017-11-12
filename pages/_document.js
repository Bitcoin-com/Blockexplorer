import Document, {Head, Main, NextScript} from 'next/document'

// The document (which is SSR-only) needs to be customized to expose the locale
// data for the user's locale for React Intl to work in the browser.
export default class NextDocument extends Document {
  static async getInitialProps (context) {
    const props = await super.getInitialProps(context)

    return {
      ...props,
    }
  }

  render () {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <script dangerouslySetInnerHTML={{
            __html: `
              var BitcoinMenyWidth = 1152;
              var BitcoinMenuLang = "en";
            `
          }} />
          <script src="https://menu.bitcoin.com/universal-menu.js"></script>

          <NextScript />
        </body>
      </html>
    )
  }
}
