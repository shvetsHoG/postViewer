import {useEffect, useRef} from "react";

export const useObserver = (ref,canLoad, isPostLoading, callback) => {
    const observer = useRef();

    useEffect(() => {
        if (isPostLoading) return;
        if (observer.current) observer.current.disconnect();
        let cb = (entries, observer) => {
            if (entries[0].isIntersecting && canLoad) {
                callback()
            }
        }

        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current)
    }, [isPostLoading])
}