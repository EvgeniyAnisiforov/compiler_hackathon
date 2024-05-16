import { FC, ReactElement } from "react"
import { useState, useRef, useEffect  } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import style from "./HomePage.module.css"
import RadioForm from "../../components/RadioForm";
import ModalChart from "../../components/ModalChart";

const HomePage: FC<{}> = (): ReactElement => {

    const navigate = useNavigate()
    const goRegistr = () => navigate("/registration")
    const goHome = () => navigate("/")

    const [valueModalChart, setValueModalChart] =useState<boolean>(false)
    const [defaultCode, _setDefaultCode] = useState(`def bubble_sort(arr):
    n = len(arr)

    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

# Пример использования
arr = [64, 34, 25, 12, 22, 11, 90]

print("Исходный массив:")
print(arr)

bubble_sort(arr)

print("Отсортированный массив:")
print(arr)
`);
    const [code, setCode] = useState(defaultCode);
    
    const codeLines = code.split('\n'); 
    const textAreaRef = useRef<HTMLTextAreaElement>(null); // Уточнили тип рефа
    const lineNumbersRef = useRef<HTMLDivElement>(null);     // Уточнили тип рефа

    const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        const clipboardData = event.clipboardData; //  Убрали window.clipboardData
        const pastedText = clipboardData.getData('text');

        const formattedText = pastedText.replace(/\t/g, '  '); 
        setCode(code + formattedText);
    }

    useEffect(() => {
        const handleScroll = () => {
          if (lineNumbersRef.current && textAreaRef.current) {
            lineNumbersRef.current.scrollTop = textAreaRef.current.scrollTop;
          }
        };
    
        if (textAreaRef.current) {
          textAreaRef.current.addEventListener('scroll', handleScroll);
        }
    
        return () => {
          if (textAreaRef.current) {
            textAreaRef.current.removeEventListener('scroll', handleScroll);
          }
        };
      }, []);

    return (
        <div className={style["area"]} >
            <div className={style["HomePage__wrapper"]}>
                <div className={style["Homepage__containerHeader--flex"]}>
                    <div><GiHamburgerMenu className={style["HomePage__burgerMenu"]}/></div>
                    <div>
                        <button onClick={goHome} className={style["HomePage__button"]}>Войти</button>
                        <button onClick={goRegistr}className={style["HomePage__button"]}>Регистрация</button>
                    </div>
                </div>

                <div className={style["HomePage__wrapperCompiler--flex"]}>
                    <RadioForm/>
                    <div >
                        <div className={style["HomePage__containerCompiler--flex"]}>
                            <div className={style["HomePage__compilerWrapper"]} style={{ display: 'flex', justifyContent: "center" }}>
                                <div className={style["HomePage__compilerNumber"]}>
                                    <div ref={lineNumbersRef} className={style["HomePage__compilerNumber--margin"]}>
                                        {codeLines.map((_, index) => (
                                        <div style={{fontFamily:"monospace"}} key={index}>{index + 1}</div> 
                                        ))}
                                    </div>
                                </div>
                                <div className={style["HomePage__containerCompilerTextCode"]}>
                                    <textarea
                                            ref={textAreaRef}
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            onPaste={handlePaste}
                                            className={style["HomePage__compilerTextCode"]}
                                        />
                                </div>
                            </div>

                            <div className={style["HomePage__containerOutput"]}>
                                <div className={style["HomePage__compilerWrapperOutput"]}>
                                    Нажмите запустить, что бы увидеть результат
                                </div>
                            </div>
                        </div>
                        <div className={style["HomePage__containerButton"]}>
                            <button className={style["HomePage__button"]}>запустить</button>
                            <button onClick={()=>setValueModalChart(true)} className={style["HomePage__button"]}>скорость</button>
                        </div>
                    </div>
                </div>
            </div>
            

            {valueModalChart && <ModalChart close={(e)=>setValueModalChart(e)}/>}
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
        </div >
    )
}
export {HomePage}