import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';

enum Status {
 CORRECT_POSITION = "success",
 WRONG_POSITION = "warning",
 WRONG_CHAR = "danger"
}

function App() {
  const word = "plunk";
  const [letter1, setLetter1] = useState('');
  const [letter2, setLetter2] = useState('');
  const [letter3, setLetter3] = useState('');
  const [letter4, setLetter4] = useState('');
  const [letter5, setLetter5] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const inputRef4 = useRef<HTMLInputElement>(null);
  const inputRef5 = useRef<HTMLInputElement>(null);
  let inputRefArray = [
    {ref: inputRef1, result: '', letter: () => letter1, setLetter: (l: string) => setLetter1(l)},
    {ref: inputRef2, result: '', letter: () => letter2, setLetter: (l: string) => setLetter2(l)},
    {ref: inputRef3, result: '', letter: () => letter3, setLetter: (l: string) => setLetter3(l)},
    {ref: inputRef4, result: '', letter: () => letter4, setLetter: (l: string) => setLetter4(l)},
    {ref: inputRef5, result: '', letter: () => letter5, setLetter: (l: string) => setLetter5(l)}
  ];

  const handleChange = (e: any) => {
    const max = inputRefArray.length;
    if (index < max) {
      inputRefArray[index].setLetter(e.target.value);
      const nextIndex = index === max - 1 ? index : index + 1;
      setIndex(nextIndex);
      inputRefArray[nextIndex].ref.current?.focus();
    }
  }

  const isAllInputFull = () => {
    console.log(inputRefArray)
    let emptyInput = inputRefArray.filter( input => input.letter() === '')
    if (emptyInput.length > 0) return false;
    return true;
  }

  const showResult = () => {
    let i = 0;
    inputRefArray = inputRefArray.filter(input => input.result === '').map( input => {
      console.log(input)
      if (i < 5) {
        if (input.letter() === word[i] ) input.result = Status.CORRECT_POSITION;
        else if (input.letter() !== word[i] && word.includes(input.letter())) input.result = Status.WRONG_POSITION;
        else input.result = Status.WRONG_CHAR;
        i++;
      }
      return input
    });
  }

  document.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
      console.log(isAllInputFull())
        if(isAllInputFull()) {
            showResult()
        }
    }
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Word of the Day
        </p>
        <div style={{ display: 'flex'}}>
          {inputRefArray.map( (input, i) => <input key={i} type='text' style={input.result ? (input.result === Status.CORRECT_POSITION ? success : (input.result === Status.WRONG_POSITION ? warning : danger)) : base} ref={input.ref} maxLength={1} onChange={handleChange} />)}
          {/* <input type='text' style={base} ref={inputRef1} maxLength={1} onChange={handleChange} />
          <input type='text' style={base} ref={inputRef2} maxLength={1} onChange={handleChange} />
          <input type='text' style={base} ref={inputRef3} maxLength={1} onChange={handleChange} />
          <input type='text' style={base} ref={inputRef4} maxLength={1} onChange={handleChange} />
          <input type='text' style={base} ref={inputRef5} maxLength={1} onChange={handleChange} /> */}
        </div>
        <p>{inputRefArray.map( (input, i) => <span key={i}>{input.letter()}</span>)}</p>
      </header>
    </div>
  );
}

const base = {
  width: 40,
  height: 40,
  padding: '0 10px',
  margin: '0 10px',
  borderWidth: 1,
  borderColor: "darkblue",
  borderRadius: 5,
  outline: 0,

  '::placeholder': { color: "grey" },
  '&:focus': {
    borderWidth: 1,
    borderColor: "darkblue",
  },
};

const success = {
  width: 40,
  height: 40,
  padding: '0 10px',
  margin: '0 10px',
  background: "green",
  borderWidth: 1,
  borderColor: "darkblue",
  borderRadius: 5,
  outline: 0,

  '::placeholder': { color: "grey" },
  '&:focus': {
    borderWidth: 1,
    borderColor: "darkblue",
  },
};

const warning = {
  width: 40,
  height: 40,
  padding: '0 10px',
  margin: '0 10px',
  background: "yellow",
  borderWidth: 1,
  borderColor: "darkblue",
  borderRadius: 5,
  outline: 0,

  '::placeholder': { color: "grey" },
  '&:focus': {
    borderWidth: 1,
    borderColor: "darkblue",
  },
};

const danger = {
  width: 40,
  height: 40,
  padding: '0 10px',
  margin: '0 10px',
  background: "red",
  borderWidth: 1,
  borderColor: "darkblue",
  borderRadius: 5,
  outline: 0,

  '::placeholder': { color: "grey" },
  '&:focus': {
    borderWidth: 1,
    borderColor: "darkblue",
  },
};

export default App;
