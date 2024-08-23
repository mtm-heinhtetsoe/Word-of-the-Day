import { useState } from "react"
import InputGroup from "../molecules/InputGroup"

type Props = {
    tryCount: number,
    word: string,
}

const WOTD = ( props: Props) => {
    const [activeRow, setActiveRow] = useState(0);

    document.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            if(localStorage.getItem("answer")?.length === props.word.length) {
                setActiveRow(activeRow + 1)
                setTimeout(() => {
                    localStorage.clear()
                }, 100);
            }
        }
    })

    return (
        <div>
        {Array.from({length: props.tryCount}).map((_, index) => (
          <InputGroup key={index} word={props.word} disable={index === activeRow ? false : true} />
        ))}
      </div>
    )
}

export default WOTD;