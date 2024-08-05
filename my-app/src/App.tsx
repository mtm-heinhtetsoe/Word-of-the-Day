import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

enum Status {
 CORRECT_POSITION = "success",
 WRONG_POSITION = "warning",
 WRONG_CHAR = "danger"
}

function App() {
  const word = "plunk".toUpperCase();
  const tryCount = 6;
  const base: React.CSSProperties = {
    width: 56,
    height: 56,
    boxSizing: "border-box",
    textAlign: "center",
    padding: '0 10px',
    margin: '3px',
    border: "1.5px solid rgb(240, 185, 11)",
    background: "rgb(11, 14, 17)",
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 32,
    color: "rgb(240, 185, 11)",
    borderRadius: 6,
    outline: 0,
  };
  
  const success: React.CSSProperties = {
    width: 56,
    height: 56,
    boxSizing: "border-box",
    textAlign: "center",
    padding: '0 10px',
    margin: '3px',
    border: "1.5px solid rgb(2, 192, 118)",
    background: "rgb(2, 192, 118)",
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 32,
    color: "white",
    borderRadius: 6,
    outline: 0,
  };
  
  const warning: React.CSSProperties = {
    width: 56,
    height: 56,
    boxSizing: "border-box",
    textAlign: "center",
    padding: '0 10px',
    margin: '3px',
    border: "1.5px solid rgb(240, 185, 11)",
    background: "rgb(240, 185, 11)",
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 32,
    color: "white",
    borderRadius: 6,
    outline: 0,
  };
  
  const danger: React.CSSProperties = {
    width: 56,
    height: 56,
    boxSizing: "border-box",
    textAlign: "center",
    padding: '0 10px',
    margin: '3px',
    border: "1.5px solid rgb(71, 77, 87)",
    background: "rgb(71, 77, 87)",
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 32,
    color: "white",
    borderRadius: 6,
    outline: 0,
  };

  let [letterInputs, setLetterInputs] = useState<any[][]>([]);
  let [row, setRow] = useState(0);

  useEffect(() => {
    const inputMaster = [];
    const r = row;
    for (let i = 0; i < tryCount; i++) {
      const inputs = word.split('').map(() => ({
        ref: React.createRef(),
        result: '',
        letter: '',
        disable: r === i ? false : true,
      }));
      inputMaster.push(inputs)
    }

    setLetterInputs(inputMaster)
  }, []);

  const setLetter = (index: any, letter: any) => {
    setLetterInputs(prevState => {
      const newInputs = [...prevState];
      newInputs[row][index].letter = letter.toUpperCase();
      return newInputs;
    })
  }

  const setResult = (index: any, result: any) => {
    setLetterInputs(prevState => {
      const newInputs = [...prevState];
      newInputs[row][index].result = result;
      newInputs[row][index].disable = true;
      return newInputs;
    })
  }

  const unsetDisable = (r: any) => {
    setLetterInputs(prevState => {
      const newInputs = [...prevState];
      newInputs[r]?.map(input => input.disable = false)
      return newInputs;
    })
  }
  
  const handleChange = (value: any, i: any, j: any) => {
    const max = word.length;
    if (j < max) {
      setLetter(j, value);
      const nextIndex = j === max - 1 ? j : j + 1;
      letterInputs[i][nextIndex].ref.current.focus();
    }
  }

  const isAllInputFilled = () => {
    let emptyInput = letterInputs[row]?.filter(input => input.result === '').filter( input => input.letter === '');
    if (emptyInput && emptyInput.length > 0) return false;
    return true;
  }

  const showResult = async () => {
    letterInputs[row]?.map((letterInput, i) => {
      if (letterInput.letter === word[i]) setResult(i, Status.CORRECT_POSITION)
      else if (letterInput.letter !== word[i] && word.includes(letterInput.letter)) setResult(i, Status.WRONG_POSITION)
      else setResult(i, Status.WRONG_CHAR);
      return letterInput;
    });
  }

  const showStyle = (result: string) => {
    if (result === '') return base;
    else if (result === Status.CORRECT_POSITION) return success;
    else if (result === Status.WRONG_POSITION) return warning;
    else return danger;
  }

  document.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
      if(isAllInputFilled()) {
        showResult().then(() => {
          let newRow = row + 1;
          setRow(newRow);
          unsetDisable(newRow)
        })
      }
    }
  })

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" style={{ textAlign: "center" }} alt="logo" /> */}
        <p>
          Word of the Day
        </p>
        <div>
          {letterInputs.map((row, i) => 
            (<div key={i}>
              {row.map((input, j) => 
                <input key={j} 
                  type='text' 
                  value={input.letter.toUpperCase()} 
                  style={showStyle(input.result)} 
                  ref={input.ref} 
                  maxLength={1}
                  disabled={input.disable} 
                  onChange={(e) => handleChange(e.target.value, i, j)} 
                />
              )}
            </div>)
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
