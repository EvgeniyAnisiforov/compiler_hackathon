import { FC, ReactElement } from "react"
import { useNavigate } from "react-router-dom"
import style from "./LoginPage.module.css"
import { Input } from "antd"
import MenuColorIcon from "../../components/MenuColorIcon"
import { useAppSelector } from "../../hook/hookRTK"
import AnimationBackground from "../../components/Animation/AnimationBackground"
import { useForm, SubmitHandler, Controller } from "react-hook-form"

type Inputs = {
  login: string
  password: string
}

const LoginPage: FC<{}> = (): ReactElement => {
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
  const goRegistr = () => navigate("/registration")
  const goHome = () => navigate("/home")

  const backgroundColor = useAppSelector((state) => state.setColor.value)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Здесь можно обработать данные формы
    console.log(data)
    alert(JSON.stringify(data))
    reset()
  }

  return (
    <div className={style["area"]} style={{ backgroundColor: backgroundColor }}>
      <div className={style["LoginPage__wrapper"]}>
        <div className={style["LoginPage_containerIconColor"]}>
          <MenuColorIcon />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={style["LoginPage__container--white"]}
        >
          <h3 className={style["LoginPage__h1"]}>Авторизация</h3>
          <div className={style["LoginPage__containerInput"]}>
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
          <div className={style["LoginPage__containerInput"]}>
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
          <div className={style["LoginPage__containerText"]}>
            <p>
              У вас нет аккаунта?
              <button
                className={style["LoginPage__buttonRegistr"]}
                onClick={goRegistr}
              >
                Регистрация
              </button>
            </p>
          </div>
          <div className={style["LoginPage__containerTextGuest"]}>
            <a onClick={goHome}>Войти как гость</a>
          </div>
          <div className={style["LoginPage__containerButton"]}>
            <button className={style["LoginPage__button"]} type="submit">
              Войти
            </button>
          </div>
        </form>
      </div>

      <AnimationBackground />
    </div>
  )
}
export { LoginPage }
