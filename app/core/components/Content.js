const Content = ({ children, style }) => (
  <div className="content" style={style}>
    {children}

    <style jsx>{`
      .content {
        max-width: 920px;
        margin: 0 auto;
        padding: 10px;
        text-align: left;
        position: relative;
      }
    `}</style>
  </div>
)

export default Content;
