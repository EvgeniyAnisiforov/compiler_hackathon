import { FC, ReactElement } from "react"
import { useNavigate } from "react-router-dom"
import style from "./RegistrationPage.module.css"
import { Input } from "antd"
import MenuColorIcon from "../../components/MenuColorIcon"
import { useAppSelector, useAppDispatch } from "../../hook/hookRTK"
import AnimationBackground from "../../components/Animation/AnimationBackground"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import animationOn from '../../assets/img/animationOn.svg'
import animationOff from '../../assets/img/animationOff.svg'
import { setAnimation } from "../../store/animationBackground-slice"

type Inputs = {
  login: string
  password: string
  name: string
  surname: string
}


const RegistrationPage: FC<{}> = (): ReactElement => {

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      login: "",
      password: "",
    },
  })

  const navigate = useNavigate()
  const goLogin = () => navigate("/")

  const dispatch = useAppDispatch()
  const animationBackground = useAppSelector((state)=> state.animationBackground.value)
  const backgroundColor = useAppSelector((state) => state.setColor.value)


  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Здесь можно обработать данные формы
    console.log(data)
    alert(JSON.stringify(data))
    reset()
  }

  return (
    <div className={style["area"]} style={{ backgroundColor: backgroundColor }}>
      <div className={style["RegistrationPage__wrapper"]}>
        <div className={style["RegistrationPage_containerIconColor"]}>
          <MenuColorIcon />
          <div>
            <img onClick={()=>dispatch(setAnimation(!animationBackground))} src={animationBackground ? animationOn : animationOff} style={{width: "45px", height: "45px", cursor: "pointer" }}/>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={style["RegistrationPage__container--white"]}>
          <h3 className={style["RegistrationPage__h1"]}>Регистрация</h3>
          <div className={style["RegistrationPage__containerInput"]}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Поле обязательно к заполнению",
              }}
              render={({ field }) => <Input {...field} placeholder="Имя" />}
            />
            {errors?.name && errors.name.message && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors.name.message}
              </span>
            )}
          </div>
          <div className={style["RegistrationPage__containerInput"]}>
            <Controller
              name="surname"
              control={control}
              rules={{
                required: "Поле обязательно к заполнению",
              }}
              render={({ field }) => <Input {...field} placeholder="Фамилия" />}
            />
            {errors?.name && errors.name.message && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors.name.message}
              </span>
            )}
          </div>
          <div className={style["RegistrationPage__containerInput"]}>
          <Controller
              name="login"
              control={control}
              rules={{
                required: "Поле обязательно к заполнению",
                minLength: {
                  value: 8,
                  message: "Минимальная длина 8 символов",
                },
              }}
              render={({ field }) => <Input {...field} placeholder="Логин" />}
            />
            {errors?.login && errors.login.message && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors.login.message}
              </span>
            )}
          </div>
          <div className={style["RegistrationPage__containerInput"]}> 
          <Controller
              name="password"
              control={control}
              rules={{
                required: "Поле обязательно к заполнению",
                minLength: {
                  value: 8,
                  message: "Минимальная длина 8 символов",
                },
              }}
              render={({ field }) => (
                <Input.Password {...field} placeholder="Пароль" />
              )}
            />
            {errors.password && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors.password.message}
              </span>
            )}
          </div>
          <div className={style["RegistrationPage__containerText"]}>
            <p>
              Вернуться к <a onClick={goLogin}>авторизации</a>
            </p>
          </div>
          <div className={style["RegistrationPage__containerButton"]}>
            <button className={style["RegistrationPage__button"]}>
              Отправить
            </button>
          </div>
        </form>
      </div>

      {animationBackground && <AnimationBackground />}
    </div>
  )
}
export { RegistrationPage }
