import Layout from '~/core/components/Layout';
import Header from '~/core/components/Header';
import Content from '~/core/components/Content';

import { getTextColor } from '~/ui/colors';

export default ({ children }) => (
  <div className="data-layout">
    <Layout>
      <Header />

      <Content>
        {children}
      </Content>
    </Layout>

    <style jsx>{`
      .data-layout {
        padding-top: 74px;
      }
      .data-layout :global(h1) {
        font-size: 24px;
        color: ${getTextColor(0.7)};
        margin-top: 30px;
      }
      .data-layout :global(h2) {
        font-size: 20px;
        color: ${getTextColor(0.6)};
        font-weight: 500;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `}</style>
  </div>
)
