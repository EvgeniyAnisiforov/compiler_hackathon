import { FC, ReactElement } from "react"
import style from "./AnimationBackground.module.css" 

const AnimationBackground: FC<{}> = (): ReactElement => {
    return (
        <>
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
        </>
    )
}
export default AnimationBackground