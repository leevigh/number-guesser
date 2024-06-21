import React, { useState } from 'react';
import { generateRandomNumber } from './utils/generateRandomNumber';
import './App.css';

function App() {
  const [secretNumber, setSecretNumber] = useState<number>(generateRandomNumber());
  const [guess, setGuess] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);

  const maxAttempts = 10;

  const handlePlayerGuess = () => {
    const playerGuess = parseInt(guess);

    if (isNaN(playerGuess)) {
      setFeedback('Please enter a valid number!');
      return;
    }

    setAttempts(attempts + 1);

    switch (true) {
      case playerGuess < secretNumber:
        setFeedback("Too low!");
        setTimeout(() => {
          setFeedback("")
        }, 4000);
        break;
      case playerGuess > secretNumber:
        setFeedback("Too high!");
        setTimeout(() => {
          setFeedback("")
        }, 4000);
        break;
      case playerGuess === secretNumber:
        setFeedback("That's correct! You win!");
        break;
      default:
        break;
    }

    if (attempts + 1 >= maxAttempts && playerGuess !== secretNumber) {
      setFeedback(`Game over! The number was ${secretNumber}.`);
    }
  };

  const handleGameReset = () => {
    setSecretNumber(generateRandomNumber());
    setGuess('');
    setFeedback('');
    setAttempts(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
  };

  const handleClear = () => {
    setGuess("");
  }

  return (
    <main>
      <div className='relative bg-gradient-to-r from-indigo-500 to-blue-500 flex flex-col justify-center items-center h-screen'>
        <div className='text-center '>
          <h1 className='text-2xl md:text-5xl py-4 text-white'>Number Guesser</h1>

          <div>
            <p>Guess a number between 1 and 100</p>
          </div>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <div className='relative py-2'>
            <input
                type="number"
                className="p-4 border-[1px] rounded-md border-green-400 max-w-[250px]"
                style={{ 
                  appearance: 'none', 
                  MozAppearance: 'textfield' 
                }}
                value={guess}
                onChange={handleInputChange}
                disabled={feedback.includes('Correct') || attempts >= maxAttempts}
            />
            {guess && (
              <button
                onClick={handleClear}
                className="absolute border-[1px] w-[20px] grid place-items-center h-[20px] rounded-full bg-gray-500 right-2 top-1/2 transform -translate-y-1/2 text-white"
              >
                &times;
              </button>
            )}
          </div>

          <div className='py-4'>
            <button className='border-[1px] text-white bg-green-400 font-semibold border-green-400 p-4 rounded-md' onClick={handlePlayerGuess} disabled={feedback.includes('Correct') || attempts >= maxAttempts}>
              Guess
            </button>
          </div>
          <div>
            <button onClick={handleGameReset} className='text-green-400'>Play Again</button>
          </div>
          <p>{feedback}</p>
        </div>

        <div className='absolute bottom-0'>
          <h3>Attempts Left</h3>
          <p className='text-3xl md:text-6xl'>{attempts}</p>
        </div>
      </div>

    </main>
  )
}

export default App
