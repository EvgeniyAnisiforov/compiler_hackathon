import { FC, ReactElement } from "react"
import style from "./ModalChart.module.css"

interface PropsType{
    close: (e:boolean) =>void 
}
const ModalChart: FC<PropsType> = (props): ReactElement => {
    return (
        <div onClick={()=>props.close(false)} className={style["ModalChart__wrapperBlure"]}>
            <div className={style["ModalChart__wrapperModal"]}></div>
        </div>
    )
}
export default ModalChart