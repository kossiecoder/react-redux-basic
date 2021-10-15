const Card = ({ title }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        {title}
      </div>
    </div>
  );
};

export default Card;