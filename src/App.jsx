import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [theme, setTheme] = useState('light');
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    if (value === 'C') {
      setInput('');
    } else if (value === '←') {
      setInput(input.slice(0, -1));
    } else if (value === '=') {
      try {
        const result = eval(input);
        setHistory([...history, `${input} = ${result}`]);
        setInput(result.toString());
      } catch {
        setInput('Erro');
      }
    } else {
      setInput(input + value);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`calculator ${theme}`}>
      <div className="theme-toggle">
        <button onClick={toggleTheme}>Tema: {theme}</button>
      </div>
      <div className="display">{input || '0'}</div>
      <div className="buttons">
        {["7", "8", "9", "/",
          "4", "5", "6", "*",
          "1", "2", "3", "-",
          "0", ".", "=", "+",
          "C", "←", "%", "√"].map((btn) => (
          <button key={btn} onClick={() =>
            btn === '√'
              ? setInput(Math.sqrt(parseFloat(input)).toString())
              : btn === '%'
              ? setInput((parseFloat(input) / 100).toString())
              : handleClick(btn)
          }>{btn}</button>
        ))}
      </div>
      <div className="history">
        <h3>Histórico</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;