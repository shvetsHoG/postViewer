import React from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate} from "react-router-dom";

const PostItem = (props) => {
    const router = useNavigate()
    return (
        <div className="post">
            <div className="post_content">
                <div>{props.post.id}. {props.post.title}</div>
                <div>{props.post.body}</div>
            </div>
            <div className="post_button">
                <MyButton onClick={() => router(`/posts/${props.post.id}`)}>Открыть</MyButton>
                <MyButton onClick={() => props.deletePost(props.post)}>Удалить</MyButton>
            </div>
        </div>
    );
};

export default PostItem;