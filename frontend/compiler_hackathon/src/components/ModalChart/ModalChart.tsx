import { FC, ReactElement } from "react"
import style from "./ModalChart.module.css"
import BarChart from "./BarChart"
import { RxCross1 } from "react-icons/rx"

interface PropsType {
  close: (e: boolean) => void
}
const ModalChart: FC<PropsType> = (props): ReactElement => {
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
        <BarChart />
      </div>
    </div>
  )
}
export default ModalChart
