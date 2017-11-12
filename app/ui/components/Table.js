import { getTextColor } from '~/ui/colors';
import MidTruncate from '~/core/components/MidTruncate';

export const Title = ({ text, style }) => (
  <thead>
    <tr>
      <th style={style}>
        {text}
      </th>
    </tr>
  </thead>
)

export const Row = ({ title, data, children }) => (
  <tr>
    {title && (
      <th>{title}</th>
    )}
    <td>
      {!!data && (
        <MidTruncate>
          {data}
        </MidTruncate>
      )}

      {children}
    </td>

    <style jsx>{`
      th {
        text-transform: capitalize;
      }
    `}</style>
  </tr>
)


const Table = ({ children, style }) => (
  <table style={style}>
    {children}

    <style jsx>{`
      table {
        font-size: 16px;
        border-collapse: collapse;
        white-space: nowrap;
        text-align: left;
      }

      table :global(td), 
      table :global(th) {
        padding: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      table :global(th) {
        color: ${getTextColor(0.5)};
      }

      table :global(tbody th) {
        color: ${getTextColor(0.6)};
      }

      table :global(tbody tr:nth-child(odd)) {
        background-color: rgba(123,125,120,0.08);
      }

      table :global(td) {
        color: ${getTextColor(0.7)};
        display: flex;
      }
    `}</style>
  </table>
)

export default Table;
