import React from "react";
import Input from "../atoms/Input";

type Props = {
    word: string,
    disable: boolean,
}

const InputGroup = ( props: Props ) => {
    const inputRefs = props.word.split('').map(() => {
        return React.createRef<HTMLInputElement>();
    })

    const getNextRef = (i: number) => {
        if (i === props.word.length - 1) return null;
        return inputRefs[i + 1];
    }

    return (
      <div>
        {Array.from({length: props.word.length}).map((_, i) => {
            return (
                <Input 
                    key={i} 
                    index={i} 
                    correctLetter={props.word[i]} 
                    word={props.word}
                    disable={props.disable} 
                    currentRef={inputRefs[i]} 
                    nextRef={getNextRef(i)}
                />
            )
        })}
      </div>
    )
}

export default InputGroup;