
import './App.css';
import React, { useState, useEffect } from 'react';
import {  NumericFormat } from 'react-number-format';



function App() {

  const [preState, setPreState] = useState('');
  const [curState, setCurState] = useState('');
  const [input, setInput] = useState('0');
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  function inputNum(e) {
    if (curState.includes('.') && e.target.innerText === '.') return;
    if (total) {
      setPreState('')
    }
    curState
      ? setCurState((pre) => pre + e.target.innerText)
      : setCurState(e.target.innerText)
    setTotal(false)
  }
  useEffect(() => { setInput(curState) }, [curState]);
  useEffect(() => { setInput('0') }, []);

  function operatoeType(e) {
    setTotal(false);
    setOperator(e.target.innerText);
    if (curState === '') return;
    if (preState !== '') {
      equals()
    } else {
      setPreState(curState)
      setCurState('')
    }
  }

  function equals(e) {
    if (e.target.innerText === "=") {
      setTotal(true)
    }

    let cal
    switch (operator) {
      case '/':
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;
      case '+':
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case '-':
        cal = String(parseFloat(preState) - parseFloat(curState));
        break;
      case '*':
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      default: return
    }
    setInput('');
    setPreState(cal);
    setCurState('');

  }


  function minusPlus() {
    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1))
    } else {
      setCurState('-' + curState)
    }
  }

  function percent() {
    preState
      ? setCurState(String(parseFloat(curState) / 100 * preState))
      : setCurState(String(parseFloat(curState) / 100));
  }

  function reset() {
    setInput('0');
  }


  return (
    <div className="container">
      <div className='wrapper'>
        <div className='screen'>
          {input !== '' || input === '0'
            ? (<NumericFormat value={input} displayType='text' thousandSeparator={true} />)
            : (<NumericFormat value={preState} displayType='text' thousandSeparator={true} />)}
        </div>
        <div className='btn light-top' onClick={reset}>AC</div>
        <div className='btn light-top' onClick={percent}>%</div>
        <div className='btn light-top' onClick={minusPlus}>+/-</div>
        <div className='btn orange' onClick={operatoeType}>/</div>
        <div className='btn' onClick={inputNum}>7</div>
        <div className='btn' onClick={inputNum}>8</div>
        <div className='btn' onClick={inputNum}>9</div>
        <div className='btn orange' onClick={operatoeType}>*</div>
        <div className='btn' onClick={inputNum}>4</div>
        <div className='btn' onClick={inputNum}>5</div>
        <div className='btn' onClick={inputNum}>6</div>
        <div className='btn orange' onClick={operatoeType}>+</div>
        <div className='btn' onClick={inputNum}>1</div>
        <div className='btn' onClick={inputNum}>2</div>
        <div className='btn' onClick={inputNum}>3</div>
        <div className='btn orange' onClick={operatoeType}>-</div>
        <div className='btn zero' onClick={inputNum}>0</div>
        <div className='btn' onClick={inputNum}>.</div>
        <div className='btn' onClick={equals}>=</div>

      </div>

    </div>
  );
}

export default App;
