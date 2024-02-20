import React from 'react';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostList = ({deletePost, posts, title}) => {
    if (!posts.length) {
        return <h1 style={{textAlign: "center"}}>Посты не найдены</h1>
    }

    return (
        <div>
            <h1 style={{textAlign:"center"}}>{title}</h1>
            <TransitionGroup>
                {posts.map((post, id) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames={"post"}
                    >
                        <PostItem deletePost={deletePost} number={id+1} post={post}></PostItem>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default PostList;