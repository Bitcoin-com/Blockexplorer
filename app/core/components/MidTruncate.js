const NUM_LAST = 4;

const MidTruncate = ({ children, numLast = NUM_LAST }) => {
  const text = String(children);
  const endStr = text.substr(text.length - numLast);
  const startStr = text.substr(0, text.length - numLast);

  return (
    <span className="truncate">
      <span className="start">
        {startStr}
      </span>
      <span className="end">
        {endStr}
      </span>

      <style jsx>{`
        .truncate {
          display: flex;
          overflow: hidden;
        }
        .start {
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </span>
  )
}

export default MidTruncate;
