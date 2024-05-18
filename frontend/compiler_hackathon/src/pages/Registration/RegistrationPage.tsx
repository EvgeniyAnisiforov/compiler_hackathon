import { FC, ReactElement } from "react"
import { useNavigate } from "react-router-dom"
import style from "./RegistrationPage.module.css"
import { Input } from "antd"
import MenuColorIcon from "../../components/MenuColorIcon"
import { useAppSelector } from "../../hook/hookRTK"
import AnimationBackground from "../../components/Animation/AnimationBackground"
const RegistrationPage: FC<{}> = (): ReactElement => {
  const navigate = useNavigate()
  const goLogin = () => navigate("/")

  const backgroundColor = useAppSelector((state) => state.setColor.value)

  return (
    <div className={style["area"]} style={{ backgroundColor: backgroundColor }}>
      <div className={style["RegistrationPage__wrapper"]}>
        <div className={style["RegistrationPage_containerIconColor"]}>
          <MenuColorIcon />
        </div>

        <div className={style["RegistrationPage__container--white"]}>
          <h3 className={style["RegistrationPage__h1"]}>Регистрация</h3>
          <div className={style["RegistrationPage__containerInput"]}>
            <Input placeholder="Имя" />
          </div>
          <div className={style["RegistrationPage__containerInput"]}>
            <Input placeholder="Фамилия" />
          </div>
          <div className={style["RegistrationPage__containerInput"]}>
            <Input placeholder="Логин" />
          </div>
          <div className={style["RegistrationPage__containerInput"]}>
            <Input type="password" placeholder="Пароль" />
          </div>
          <div className={style["RegistrationPage__containerText"]}>
            <p>
              Вернуться к <a onClick={goLogin}>авторизации</a>
            </p>
          </div>
          <button className={style["RegistrationPage__button"]}>
            Отправить
          </button>
        </div>
      </div>

      <AnimationBackground />
    </div>
  )
}
export { RegistrationPage }
