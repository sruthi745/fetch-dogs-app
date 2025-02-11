import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ page, setPage, total }) => {
  const totalPages = Math.max(1, Math.ceil(total / 25)); 

  return (
    <div className="pagination-container">
      {total === 0 ? ( 
        <p>No results found.</p>
      ) : (
        <>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </>
      )}
    </div>
  );
};

export default Pagination;
