import React from 'react';
import classes from "./Pagination.module.css"
import {usePagination} from "../../../hooks/usePagination";

const Pagination = ({page, totalPagesCount, setPage}) => {
    const totalPagesCountArray = usePagination(totalPagesCount)
    return (
        <div className={classes.pageWrapper}>
            {totalPagesCountArray.map((p) =>
                <span
                    onClick={() => setPage(p)}
                    key={p}
                    className={page === p ? classes.pageCurrent : classes.page}
                >{p}</span>
            )}
        </div>
    );
};

export default Pagination;