import { FC, ReactElement } from "react"
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import style from "./HomePage.module.css"

const HomePage: FC<{}> = (): ReactElement => {

    const navigate = useNavigate()
    const goRegistr = () => navigate("/registration")
    const goHome = () => navigate("/")

    const [code, setCode] = useState('');
    const codeLines = code.split('\n'); 


    const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        const clipboardData = event.clipboardData; //  Убрали window.clipboardData
        const pastedText = clipboardData.getData('text');

        const formattedText = pastedText.replace(/\t/g, '  '); 
        setCode(code + formattedText);
    }

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


                <div className={style["HomePage__compilerWrapper"]} style={{ display: 'flex', justifyContent: "center" }}>
                    <div className={style["HomePage__compilerNumber"]}>
                        {codeLines.map((_, index) => (
                        <div style={{fontFamily:"monospace"}} key={index}>{index + 1}</div> 
                        ))}
                    </div>
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            onPaste={handlePaste}
                            className={style["HomePage__compilerTextCode"]}
                        />
                    </div>
            </div>

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