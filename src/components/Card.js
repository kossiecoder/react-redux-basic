import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Card = ({ title, onClick, children }) => {
  const toasts = useSelector((state) => {
    return state.toast.toasts;
  });
  console.log('hello1', toasts);
  return (
    <div 
      className="card mb-3 cursor-pointer"
      onClick={onClick}
    >
      <div className="card-body py-2 d-flex align-items-center">
        <div className="flex-grow-1">{title}</div>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
  onClick: PropTypes.func,
};

Card.defaultProps = {
  children: null,
  onClick: () => {},
};

export default Card;