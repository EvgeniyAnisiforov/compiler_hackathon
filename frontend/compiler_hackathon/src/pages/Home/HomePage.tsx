import { FC, ReactElement } from "react"
import style from "./HomePage.module.css"

const HomePage: FC<{}> = (): ReactElement => {
    return <div>
        <div className={style["area"]} >
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