import { FC, ReactElement } from "react"
import { useState, useRef, useEffect } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { useNavigate } from "react-router-dom"
import style from "./HomePage.module.css"
import RadioForm from "../../components/RadioForm"
import ModalChart from "../../components/ModalChart/ModalChart"
import MenuColorIcon from "../../components/MenuColorIcon"
import { useAppSelector } from "../../hook/hookRTK"
import { python } from "./CodeExample"
import AnimationLoading from "../../components/AnimationLoading"

const HomePage: FC<{}> = (): ReactElement => {
  const navigate = useNavigate()
  const goRegistr = () => navigate("/registration")
  const goHome = () => navigate("/")

  const [language, setLanguage] = useState<string>("Python")

  const backgroundColor = useAppSelector((state) => state.setColor.value)

  const [valueModalChart, setValueModalChart] = useState<boolean>(false)
  const [defaultCode, setDefaultCode] = useState<string>(python)

  const [code, setCode] = useState(defaultCode)

  useEffect(() => {
    setCode(defaultCode)
  }, [defaultCode])

  const codeLines = code.split("\n")
  const textAreaRef = useRef<HTMLTextAreaElement>(null) // Уточнили тип рефа
  const lineNumbersRef = useRef<HTMLDivElement>(null) // Уточнили тип рефа

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    const clipboardData = event.clipboardData //  Убрали window.clipboardData
    const pastedText = clipboardData.getData("text")

    const formattedText = pastedText.replace(/\t/g, "  ")
    setCode(code + formattedText)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (lineNumbersRef.current && textAreaRef.current) {
        lineNumbersRef.current.scrollTop = textAreaRef.current.scrollTop
      }
    }

    if (textAreaRef.current) {
      textAreaRef.current.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (textAreaRef.current) {
        textAreaRef.current.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  return (
    <div className={style["area"]} style={{ backgroundColor: backgroundColor }}>
      <div className={style["HomePage__wrapper"]}>
        <div className={style["Homepage__containerHeader--flex"]}>
          <div className={style["HomePage__containerMenuAndIcon--flex"]}>
            <GiHamburgerMenu className={style["HomePage__burgerMenu"]} />
            <MenuColorIcon />
          </div>
          <div>
            <button onClick={goHome} className={style["HomePage__button"]}>
              Войти
            </button>
            <button onClick={goRegistr} className={style["HomePage__button"]}>
              Регистрация
            </button>
          </div>
        </div>

        <div className={style["HomePage__wrapperCompiler--flex"]}>
          <RadioForm
            language={(e) => setLanguage(e)}
            defaultCode={(e) => setDefaultCode(e)}
          />
          <div>
            <div className={style["HomePage__containerCompiler--flex"]}>
              <div
                className={style["HomePage__compilerWrapper"]}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <p className={style["HomePage__language"]}>{language}</p>
                <div className={style["HomePage__compilerNumber"]}>
                  <div
                    ref={lineNumbersRef}
                    className={style["HomePage__compilerNumber--margin"]}
                  >
                    {codeLines.map((_, index) => (
                      <div style={{ fontFamily: "monospace" }} key={index}>
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={style["HomePage__containerCompilerTextCode"]}>
                  <textarea
                    ref={textAreaRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onPaste={handlePaste}
                    className={
                      backgroundColor == "#4e54c8"
                        ? `${style["HomePage__compilerTextCode1"]} ${style["HomePage__compilerTextCode"]}`
                        : backgroundColor == "#f4a261"
                        ? `${style["HomePage__compilerTextCode2"]} ${style["HomePage__compilerTextCode"]}`
                        : backgroundColor == "#fb6f92"
                        ? `${style["HomePage__compilerTextCode3"]} ${style["HomePage__compilerTextCode"]}`
                        : backgroundColor == "#00b4d8"
                        ? `${style["HomePage__compilerTextCode4"]} ${style["HomePage__compilerTextCode"]}`
                        : backgroundColor == "#003f88"
                        ? `${style["HomePage__compilerTextCode5"]} ${style["HomePage__compilerTextCode"]}`
                        : backgroundColor == "#588157"
                        ? `${style["HomePage__compilerTextCode6"]} ${style["HomePage__compilerTextCode"]}`
                        : backgroundColor == "#e5383b"
                        ? `${style["HomePage__compilerTextCode7"]} ${style["HomePage__compilerTextCode"]}`
                        : ""
                    }
                  />
                </div>
              </div>

              <div className={style["HomePage__containerOutput"]}>
                <div className={style["HomePage__compilerWrapperOutput"]}>
                  Нажмите запустить, что бы увидеть результат
                  <div>
                    <AnimationLoading />
                  </div>
                </div>
              </div>
            </div>
            <div className={style["HomePage__containerButton"]}>
              <button className={style["HomePage__button"]}>запустить</button>
              <button
                onClick={() => setValueModalChart(true)}
                className={style["HomePage__button"]}
              >
                скорость
              </button>
            </div>
          </div>
        </div>
      </div>

      {valueModalChart && <ModalChart close={(e) => setValueModalChart(e)} />}
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
    </div>
  )
}
export { HomePage }
