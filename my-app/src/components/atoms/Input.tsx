import { useState } from "react";
import { BackgroundColor, BorderColor, Color, Status, Theme } from "../../enums";

const showStyle = (result: string) => {
    const style: React.CSSProperties = {
      width: 56,
      height: 56,
      boxSizing: "border-box",
      textAlign: "center",
      padding: '0 10px',
      margin: '3px',
      border: `1.5px solid ${getStyle(result).borderColor}`,
      background: getStyle(result).backgroundColor,
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 32,
      color: getStyle(result).color,
      borderRadius: 6,
      outline: 0,
    };
  
    return style;
}

const getStyle = (result: string) => {
    let theme = Theme.BASE;
  
    if (result === '') theme = Theme.BASE;
    else if (result === Status.CORRECT_POSITION) theme = Theme.SUCCESS;
    else if (result === Status.WRONG_POSITION) theme = Theme.WARNING;
    else theme = Theme.DANGER;
  
    return {
        color: Color[theme],
        backgroundColor: BackgroundColor[theme],
        borderColor: BorderColor[theme]
    }
}

const getResult = (letter: string, correctLetter: string, word: string) => {
    if (letter === "") return ""
    else if (letter === correctLetter) return Status.CORRECT_POSITION
    else if (letter !== correctLetter && word.includes(letter)) return Status.WRONG_POSITION
    else return Status.WRONG_CHAR;
}

type Props = {
    index: number,
    correctLetter: string,
    currentRef: React.RefObject<HTMLInputElement>,
    disable: boolean,
    nextRef: React.RefObject<HTMLInputElement> | null,
    word: string,
}

const Input = ( props: Props ) => {
    const [letter, setLetter] = useState("");
    const [result, setResult] = useState("");

    document.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            if (localStorage.getItem("answer")?.length === props.word.length) {
                setResult(getResult(letter, props.correctLetter, props.word))
            }
        }
    })

    const handleChange = (value: any) => {
        if (value !== "" && value !== " ") {
            setLetter(value);
            
            let answer = localStorage.getItem("answer")?? "";

            if (answer?.length === props.word.length) {
                localStorage.setItem("answer", "")
            }

            if (localStorage.getItem("answer") === null) localStorage.setItem("answer", value)
            else localStorage.setItem("answer", localStorage.getItem("answer") + value)

            if(props.nextRef) props.nextRef.current?.focus();
        }
      }
  
    return (
        <input key={props.index} 
            type='text' 
            value={letter} 
            style={showStyle(result)} 
            ref={props.currentRef} 
            maxLength={1}
            disabled={props.disable} 
            onChange={(e) => handleChange(e.target.value.toUpperCase())} 
        />
    )
}

export default Input;