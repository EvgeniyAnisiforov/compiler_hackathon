import { FC, ReactElement } from "react"
import { useNavigate } from "react-router-dom"
import style from "./RegistrationPage.module.css"
import { Input,message } from "antd"
import MenuColorIcon from "../../components/MenuColorIcon"
import { useAppSelector, useAppDispatch } from "../../hook/hookRTK"
import AnimationBackground from "../../components/Animation/AnimationBackground"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import animationOn from '../../assets/img/animationOn.svg'
import animationOff from '../../assets/img/animationOff.svg'
import { setAnimation } from "../../store/animationBackground-slice"
import { usePostRegMutation } from "../../store/query/POST/postRegApi"
import { useState } from "react"

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

  const [reg] = usePostRegMutation(); 
     const onSubmit: SubmitHandler<Inputs> = async (dataInput:any) => {
       try {
         const result = await reg({ name: dataInput.name, surname: dataInput.surname, login: dataInput.login, password: dataInput.password }).unwrap();
         // Если запрос успешен, обрабатываем данные
         if (result) {
          goLogin()
         }
       } catch (error) {
        message.info("Этот пользователь уже существует")
       }
       reset();
     };


  return (
    <div className={style["area"]} style={{ backgroundColor: backgroundColor }}>
      <div className={style["RegistrationPage__wrapper"]}>
        <div className={style["RegistrationPage_containerIconColor"]}>
        <div className={style["RegistrationPage_menuColor"]}><MenuColorIcon /></div>
          <div className={style["RegistrationPage__buttonAnimationBackground"]}>
            <img onClick={()=>dispatch(setAnimation(!animationBackground))} src={animationBackground ? animationOn : animationOff} className={style["RegistrationPage__sizeButtonColorBackgroung"]}/>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={style["RegistrationPage__container--white"]}>
          <div className={style["RegistrationPage__container--flexCenter"]}>
            <h1 className={style["RegistrationPage__h1"]}>Регистрация</h1>
            <div className={style["RegistrationPage__containerInput"]}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Поле обязательно к заполнению",
                }}
                render={({ field }) => <Input {...field} placeholder="Имя" className={style["RegistrationPage__input--fontSize"]}/>}
              />
              {errors?.name && errors.name.message && (
                <span className={style["RegistrationPage__errorText"]}>
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
                render={({ field }) => <Input {...field} placeholder="Фамилия" className={style["RegistrationPage__input--fontSize"]}/>}
              />
              {errors?.name && errors.name.message && (
                <span className={style["RegistrationPage__errorText"]}>
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
                    value: 5,
                    message: "Минимальная длина 5 символов",
                  },
                }}
                render={({ field }) => <Input {...field} placeholder="Логин" className={style["RegistrationPage__input--fontSize"]}/>}
              />
              {errors?.login && errors.login.message && (
                <span className={style["RegistrationPage__errorText"]}>
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
                    value: 5,
                    message: "Минимальная длина 5 символов",
                  },
                }}
                render={({ field }) => (
                  <Input.Password {...field} placeholder="Пароль" className={style["RegistrationPage__input--fontSize"]}/>
                )}
              />
              {errors.password && (
                <span className={style["RegistrationPage__errorText"]}>
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
          </div>  
        </form>
      </div>

      {animationBackground && <div className={style["RegistrationPage__animationBackground"]}><AnimationBackground /></div>}
    </div>
  )
}
export { RegistrationPage }
