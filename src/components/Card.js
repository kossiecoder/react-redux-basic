const Card = ({ title, children }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>{title}</div>
          {children && <div>{children}</div>}
        </div> 
      </div>
    </div>
  );
};

export default Card;