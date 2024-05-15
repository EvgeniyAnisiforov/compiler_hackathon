import { useState } from "react"
import style from "./RadioForm.module.css"

const RadioForm = () => {
  const [selectedOption, setSelectedOption] = useState<string>("python")

  const handleChange = (event: any) => {
    const value = event.target.value
    setSelectedOption(value)
    console.log(value)
  }

  return (
    <form>
      {["python", "java", "cpp", "js"].map((option) => (
        <div key={option}>
          <input
            type="radio"
            id={`option-${option}`}
            name="options"
            value={option}
            checked={selectedOption === option}
            onChange={handleChange}
          />
          <label htmlFor={`option-${option}`}>
            <div
              className={
                option == "python"
                  ? selectedOption == option
                    ? `${style["RadioForm__pythonIcon"]} ${style["RadioForm__Icon"]} ${style["RadioForm__IconActive"]}`
                    : `${style["RadioForm__pythonIcon"]} ${style["RadioForm__Icon"]}`
                  : option == "java"
                  ? selectedOption == option
                    ? `${style["RadioForm__javaIcon"]} ${style["RadioForm__Icon"]} ${style["RadioForm__IconActive"]}`
                    : `${style["RadioForm__javaIcon"]} ${style["RadioForm__Icon"]}`
                  : option == "cpp"
                  ? selectedOption == option
                    ? `${style["RadioForm__cppIcon"]} ${style["RadioForm__Icon"]} ${style["RadioForm__IconActive"]}`
                    : `${style["RadioForm__cppIcon"]} ${style["RadioForm__Icon"]}`
                  : option == "js"
                  ? selectedOption == option
                    ? `${style["RadioForm__jsIcon"]} ${style["RadioForm__Icon"]} ${style["RadioForm__IconActive"]}`
                    : `${style["RadioForm__jsIcon"]} ${style["RadioForm__Icon"]}`
                  : ""
              }
            ></div>
          </label>
        </div>
      ))}
    </form>
  )
}

export default RadioForm
