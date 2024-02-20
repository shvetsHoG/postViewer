import React, {useEffect, useMemo, useState} from "react";
import "./Styles/App.css"
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts, useSortedPosts} from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/loader/Loader";
import {useFetching} from "./hooks/useFetching";
import {getPagesArray, getPagesCount} from "./utils/Pages";
import {usePagination} from "./hooks/usePagination";
import Pagination from "./components/UI/pagination/Pagination";
function App() {
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({sort: "", query: ""})

    const [visible, setVisible] = useState(false)

    const [totalPagesCount, setTotalPagesCount] = useState(0)

    const [limit, setLimit] = useState(10)

    const [page, setPage] = useState(1)

    const [fetchPosts, isPostLoading, postError ] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data)
        const totalCount = (response.headers["x-total-count"])
        setTotalPagesCount(getPagesCount(totalCount, limit))
    })

    const changePage = (page) => {
        setPage(page)
    }


    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const addPost = (newPost) => {
        setPosts([...posts, newPost])
        setVisible(false)
    }

    useEffect(() => {
        fetchPosts();
    }, [page]);

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
            {isPostLoading
                ? <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}>
                    <Loader />
                  </div>
                : <PostList deletePost={deletePost} posts={sortedAndSearchedPosts} title={"Список постов"} />
            }
            <Pagination
                page={page}
                totalPagesCount={totalPagesCount}
                setPage={setPage}
            />
            {postError &&
                <p>{postError}</p>
            }
        </div>
    );
}

export default App;
