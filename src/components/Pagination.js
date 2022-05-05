import propTypes from "prop-types";

const Pagination = ({ currentPage, numberOfPages, onClick, limit }) => {
  const currentSet = Math.ceil(currentPage/limit);
  const lastSet = Math.ceil(numberOfPages/limit);
  const startPage = limit * (currentSet - 1) + 1; 
  const numberOfPageForSet = currentSet === lastSet ? numberOfPages%limit : limit
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {currentSet !== 1 && <li className="page-item">
          <div 
            className="page-link cursor-pointer" href="#"
            onClick={() => onClick(startPage - limit)}
          >
            Previous
          </div>
        </li>}
        {Array(numberOfPageForSet).fill(startPage)
          .map((value, index) => value + index)
          .map((pageNumber) => {
            return <li 
              key={pageNumber}
              className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
            >
              <div 
                className="page-link cursor-pointer"
                onClick={() => {
                  onClick(pageNumber);
                }}
              >
                {pageNumber}
              </div>
            </li>
          })}
        {currentSet !== lastSet && <li className="page-item">
          <div 
            className="page-link cursor-pointer" href="#"
            onClick={() => onClick(startPage + limit)}
          >
            Next
          </div>
        </li>}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  currentPage: propTypes.number,
  numberOfPages: propTypes.number.isRequired,
  onClick: propTypes.func.isRequired,
  limit: propTypes.number
}

Pagination.defaultProps = {
  currentPage: 1,
  limit: 5
}

export default Pagination;