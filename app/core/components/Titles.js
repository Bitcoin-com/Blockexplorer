import MidTruncate from '~/core/components/MidTruncate';
import CopyButton from '~/ui/components/CopyButton';

export const SubTitle = ({ title }) => (
  <div className="title">
    <h2>
      <MidTruncate>
        {title}
      </MidTruncate>
    </h2>
    <CopyButton text={title} style={{
      marginLeft: 5,
      marginTop: 2,
    }} />

    <style jsx>{`
      .title {
        flex-grow: 1;
        display: flex;
        overflow: hidden;
      }
    `}</style>
  </div>
)

