import { FC, ReactElement } from "react"
import style from "./ModalChart.module.css"
import BarChart from "./BarChart"
import { RxCross1 } from "react-icons/rx"
import AnimationLoading from "../Animation/AnimationLoading"
import { useGetTimeQuery } from "../../store/query/GET/getTimeApi"
import { useAppSelector } from "../../hook/hookRTK"



interface PropsType {
  close: (e: boolean) => void
}
const ModalChart: FC<PropsType> = (props): ReactElement => {

  const userId = useAppSelector(state => state.statusAuth.value.userId)
  const {data=[], isLoading} = useGetTimeQuery(userId)
  

  return (
    <div
      onClick={() => props.close(false)}
      className={style["ModalChart__wrapperBlure"]}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={style["ModalChart__wrapperModal"]}
      >
        <div className={style["ModalChart__containerCross"]}>
          <RxCross1
            onClick={() => props.close(false)}
            className={style["ModalChart__cross"]}
          />
        </div>
        {isLoading ? <AnimationLoading/> : <BarChart data={data}/>}
      </div>
    </div>
  )
}
export default ModalChart
