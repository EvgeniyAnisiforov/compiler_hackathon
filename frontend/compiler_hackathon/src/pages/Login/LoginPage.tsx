import { FC, ReactElement } from "react"
import { useNavigate } from "react-router-dom";
import style from "./LoginPage.module.css"
import { Input } from 'antd';

const LoginPage: FC<{}> = (): ReactElement => { 

    const navigate = useNavigate()
    const goRegistr = () => navigate("/registration")
    const goHome = () => navigate("/home")
    return <div className={style["LoginPage__wrapper"]}>
        <div className={style["LoginPage__container--white"]}>
            <h3 className={style["LoginPage__h1"]}>Авторизация</h3>
            <div className={style["LoginPage__containerInput"]}><Input placeholder="Логин" /></div>
            <div className={style["LoginPage__containerInput"]}><Input type="password" placeholder="Пароль" /></div>
            <div className={style["LoginPage__containerText"]}><p>У вас нет аккаунта?<button className={style["LoginPage__buttonRegistr"]} onClick={goRegistr}>Регистрация</button></p></div>
            <div className={style["LoginPage__containerTextGuest"]}><a onClick={goHome}>Войти как гость</a></div>
            <button className={style["LoginPage__button"]}>Войти</button>
        </div>
    </div>
}
export {LoginPage}


