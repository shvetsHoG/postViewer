import {useMemo} from "react";
import {getPagesArray} from "../utils/Pages";

export const usePagination = (totalPagesCount) => {
    const array = useMemo(() => {
        return getPagesArray(totalPagesCount)
    }, [totalPagesCount])

    return array
}