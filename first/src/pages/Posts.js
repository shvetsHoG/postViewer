import React, {useEffect, useMemo, useRef, useState} from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {usePosts, useSortedPosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPagesArray, getPagesCount} from "../utils/Pages";
import Pagination from "../components/UI/pagination/Pagination";
import axios from "axios";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";
function Posts() {

    const url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m"
    /*useEffect(() => {
        fetch(url)
            .then((data) => data.json())
            .then((data) => console.log(data.current.temperature_2m))
    }, []);*/

    useEffect(() => {
        axios.get(url)
            .then((responce) => console.log(responce.data.current.temperature_2m))

    }, []);

    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({sort: "", query: ""})

    const [visible, setVisible] = useState(false)

    const [totalPagesCount, setTotalPagesCount] = useState(0)

    const [limit, setLimit] = useState(10)

    const [page, setPage] = useState(1)

    const lastElement = useRef()


    const [fetchPosts, isPostLoading, postError ] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data])
        const totalCount = (response.headers["x-total-count"])
        setTotalPagesCount(getPagesCount(totalCount, limit))
    })
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const addPost = (newPost) => {
        setPosts([...posts, newPost])
        setVisible(false)

    }

    useObserver(lastElement, page < totalPagesCount, isPostLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts();
    }, [page, limit]);
    const deletePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))

    }

    return (
        <div className="App">
            <MyButton style={{marginTop: "15px"}} onClick={() => setVisible(true)}>Добавить пост</MyButton>
            <MyModal visible={visible} setVisible={setVisible}>
                <PostForm addPost={addPost}></PostForm>
            </MyModal>
            <hr style={{margin: "15px 0"}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                options = {[
                    {value: 5, name : "5"},
                    {value: 10, name : "10"},
                    {value: 25, name : "25"},
                    {value: -1, name : "Все посты"}
                ]}
                defaultValue="Количество элементов на странице"
            />
            <PostList deletePost={deletePost} posts={sortedAndSearchedPosts} title={"Список постов"} />
            <div ref={lastElement} className="observerDiv" style={{paddingTop: "20px"}}></div>
            {isPostLoading &&
                <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}>
                    <Loader />
                </div>
            }
            {postError &&
                <p>{postError}</p>
            }
        </div>
    );
}

export default Posts;