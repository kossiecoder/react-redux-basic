import propTypes from "prop-types";

const Pagination = ({ currentPage, numberOfPages, onClick }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item disabled">
          <a className="page-link" href="#">
            Previous
          </a>
        </li>
        {Array(numberOfPages).fill(1).map((value, index) => value + index)
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
        <li className="page-item">
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  currentPage: propTypes.number,
  numberOfPages: propTypes.number.isRequired,
  onClick: propTypes.func.isRequired
}

Pagination.defaultProps = {
  currentPage: 1
}

export default Pagination;