import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {

    const {isAuth, setIsAuth} =  useContext(AuthContext)
    const login = e => {
        e.preventDefault()
        setIsAuth(false)
        localStorage.removeItem("auth")
    }

    return (
        <div className="navbar">
            <MyButton onClick={login}>Выйти</MyButton>
            <div className="navbar_links">
                <Link to="/posts" className="navbar_links_link">posts</Link>
                <Link to="/test" className="navbar_links_link">test</Link>
            </div>
        </div>
    );
};

export default Navbar;