import { FC, ReactElement } from "react"
import { GiHamburgerMenu } from "react-icons/gi";
import style from "./HomePage.module.css"

const HomePage: FC<{}> = (): ReactElement => {
    return <div>
        <div className={style["area"]} >
            <div className={style["HomePage__wrapper"]}>
                <div className={style["Homepage__containerHeader--flex"]}>
                    <div><GiHamburgerMenu className={style["HomePage__burgerMenu"]}/></div>
                    <div>
                        <button className={style["HomePage__button"]}>Войти</button>
                        <button className={style["HomePage__button"]}>Регистрация</button>
                    </div>
                </div>
            </div>

            <ul className={style["circles"]}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div >
    </div>
}
export {HomePage}