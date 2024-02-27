import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";

const PostPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPost, isPostLoading, postError ] = useFetching(async () => {
        const response = await PostService.getById(params.id);
        setPost(response.data)
    })

    const [fetchComments, isCommentsLoading, commentsError ] = useFetching(async () => {
        const commentsResponse = await PostService.getCommentsById(params.id);
        setComments(commentsResponse.data)
    })

    useEffect(() => {
        fetchPost()
        fetchComments()
    }, []);


    return (
        <div>
            Вы перешли на страницу поста {params.id}!
            {
                isPostLoading
                    ? <Loader />
                    : <div className="">{post.id}, {post.title}</div>
            }
            <div>
                Комментарии:
                {isCommentsLoading
                    ? <Loader />
                    : <div>
                        {comments.map(comment =>
                            <div key={comment.id} style={{marginTop: "15px"}}>
                                <h5>{comment.email}:</h5>
                                <div>{comment.body}</div>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    );
};

export default PostPage;