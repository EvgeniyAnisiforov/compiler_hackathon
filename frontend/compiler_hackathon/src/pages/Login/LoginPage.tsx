import { FC, ReactElement } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import style from "./LoginPage.module.css"
import { Input,message } from "antd"
import MenuColorIcon from "../../components/MenuColorIcon"
import { useAppDispatch, useAppSelector } from "../../hook/hookRTK"
import AnimationBackground from "../../components/Animation/AnimationBackground"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import animationOn from "../../assets/img/animationOn.svg"
import animationOff from "../../assets/img/animationOff.svg"
import { setAnimation } from "../../store/animationBackground-slice"
import { usePostAuthMutation } from "../../store/query/POST/postAuthApi"
import {setStatusAuth} from "../../store/statusAuth-slice"

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

  const dispatch = useAppDispatch()
  const animationBackground = useAppSelector(
    (state) => state.animationBackground.value
  )
  const backgroundColor = useAppSelector((state) => state.setColor.value)

  const [login] = usePostAuthMutation(); 

     const onSubmit: SubmitHandler<Inputs> = async (dataInput:any) => {
       try {
         const result = await login({ login: dataInput.login, password: dataInput.password }).unwrap();
         // Если запрос успешен, обрабатываем данные
         if (result) {
          const { name, surname, userID } = result; // Извлеките данные из result
          dispatch(setStatusAuth({status: true, name: name, surname: surname, userId: userID }))
          goHome()
         }
       } catch (error) {
        message.info(`Неправильный логин или пароль`)
       }
       reset();
     };

  return (
    <div className={style["area"]} style={{ backgroundColor: backgroundColor }}>
      <div className={style["LoginPage__wrapper"]}>
        <div className={style["LoginPage_containerIconColor"]}>
          <div className={style["LoginPage_menuColor"]}>
            <MenuColorIcon />
          </div>
          <div className={style["LoginPage__buttonAnimationBackground"]}>
            <img
              onClick={() => dispatch(setAnimation(!animationBackground))}
              src={animationBackground ? animationOn : animationOff}
              className={style["LoginPage__sizeButtonColorBackgroung"]}
            />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={style["LoginPage__container--white"]}
        >
          <div className={style["LoginPage__container--flexCenter"]}>
            <h1 className={style["LoginPage__h1"]}>Авторизация</h1>
            <div className={style["LoginPage__containerInput"]}>
              <Controller
                name="login"
                control={control}
                rules={{
                  required: "Поле обязательно к заполнению",
                  minLength: {
                    value: 5,
                    message: "Минимальная длина 5 символов",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Логин"
                    className={style["LoginPage__input--fontSize"]}
                  />
                )}
              />
              {errors?.login && errors.login.message && (
                <span className={style["LoginPage__errorText"]}>
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
                    value: 5,
                    message: "Минимальная длина 5 символов",
                  },
                }}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    placeholder="Пароль"
                    className={style["LoginPage__input--fontSize"]}
                  />
                )}
              />
              {errors.password && (
                <span className={style["LoginPage__errorText"]}>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className={style["LoginPage__containerText"]}>
              <p>У вас нет аккаунта?</p>
              <button
                className={style["LoginPage__buttonRegistr"]}
                onClick={goRegistr}
              >
                Регистрация
              </button>
            </div>
            <div className={style["LoginPage__containerTextGuest"]}>
              <a onClick={goHome}>Войти как гость</a>
            </div>
            <div className={style["LoginPage__containerButton"]}>
              <button className={style["LoginPage__button"]} type="submit">
                Войти
              </button>
            </div>
          </div>
        </form>
      </div>

      {animationBackground && (
        <div className={style["LoginPage__animationBackground"]}>
          <AnimationBackground />
        </div>
      )}
    </div>
  )
}
export { LoginPage }
