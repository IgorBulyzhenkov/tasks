import s from './Pagination.module.css';

function Pagination({ currentPage, totalPages, onPageChange, limit }) {
    const handleClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page, limit);
        }
    };

    const renderPageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handleClick(i)}
                    className={`${s.paginationButton} ${i === currentPage ? s.active : ""}`}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className={s.pagination}>
            <button
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={s.paginationPrev}
            >
                Previous
            </button>
            {renderPageButtons()}
            <button
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={s.paginationNext}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;