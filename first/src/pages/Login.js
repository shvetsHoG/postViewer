import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const login = e => {
        e.preventDefault()
        setIsAuth(true)
        localStorage.setItem("auth", "true")
    }

    return (
        <div>
            <h1>Страница входа в аккаунт</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Введите логин"></MyInput>
                <MyInput type="password" placeholder="Введите пароль"></MyInput>
                <MyButton>Войти</MyButton>
            </form>
        </div>
    );
};

export default Login;