import React from 'react';

export default (props) => {
  const pages = [];
  for (let i = 1; i <= props.pageCount; i++) {
    pages.push(i);
  }
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        { pages.map((page, id) => {
          return (
            <li key={id} className="page-item">
              <button
                className="page-link"
                id={page}
                onClick={props.showPageItems}
              >{page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
