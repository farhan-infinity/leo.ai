import React from 'react'

const PaginationWrapper = ({ page, totalPages, setPage }) => {

    const handlePagination = (value) => {
        if (value === 'previous' && page > 1) {
            setPage(page - 1)
        } else if (value === 'next' && page !== totalPages) {
            setPage(page + 1)
        } else {
            if (value > 0) {
                setPage(value)
            }
        }
    }
    return (

        <div className="pagination-container">
            <div className="pagination-states">
                <div
                    onClick={() => handlePagination("previous")}
                    className={`pagination-button ${page !== 1 ? '' : "pagination-disable"}`}
                >
                    Previous
                </div>
                {totalPages === null && (<div className="pagination-button pagination-active">{page}</div>)}
                {totalPages !== null && (
                    <>
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <div
                                    key={pageNumber}
                                    onClick={() => handlePagination(pageNumber)}
                                    className={`pagination-button ${pageNumber === page ? "pagination-active" : ""}`}
                                >
                                    {pageNumber}
                                </div>
                            );
                        })}
                    </>
                )}
                <div
                    onClick={() => handlePagination("next")}
                    className={`pagination-button ${page < totalPages ? '' : "pagination-disable"}`}
                >
                    Next
                </div>
            </div>
        </div>
    )
}

export default PaginationWrapper