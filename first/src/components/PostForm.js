import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({addPost}) => {
    const [post, setPost] = useState({
        title: "",
        body: ""
    })

    function addNewPost(e) {
        e.preventDefault()
        const newPost = {
            ...post,
            id: Date.now()
        }
        addPost(newPost)
        setPost({
            title: "",
            body: ""
        })
    }

    return (
        <form>
            <MyInput
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
                type="text"
                placeholder={"название поста"}
            />
            <MyInput
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                type="text"
                placeholder={"текст поста"}
            />
            <MyButton onClick={addNewPost}>Добавить пост</MyButton>
        </form>
    );
};

export default PostForm;