import React, { useState } from 'react';

const Paginator = (props) => {
    const {handleChangePage, length, itemsPerPage, currentPage } = props;
    const pageCount = Math.ceil(length / itemsPerPage);
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    };
    return (
        <div>
            <ul className="pagination pagination-sm">
                <li className={"page-item" + (currentPage === 1 && " disabled")}>
                    <button className="page-link" onClick={() => handleChangePage(currentPage - 1)}>&laquo;</button>
                </li>
                {pages.map(page => <li key={page} className={"page-item" + (currentPage === page && " active")}>
                    <button className="page-link" onClick={() => handleChangePage(page)}>{page}</button>
                </li>)}

                <li className={"page-item" + (currentPage === pageCount && " disabled")}>
                    <button className="page-link" onClick={() => handleChangePage(currentPage + 1)}>&raquo;</button>
                </li>
            </ul>
        </div>
    );
}

Paginator.getData= (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
   return items.slice(start, start + itemsPerPage)
}
export default Paginator;