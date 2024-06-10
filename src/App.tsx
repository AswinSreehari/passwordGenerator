import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState<number>(8); 
  const [numbersAllowed, setNumberAllowed] = useState<boolean>(false);
  const [charAllowed, setCharAllowed] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const passRef = useRef<HTMLInputElement>(null);

  const generatePassword = useCallback(() => {
    let pass: string = ""; 
    let str: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbersAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i < length; i++) {
      const index: number = Math.floor(Math.random() * str.length + 1);  
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, numbersAllowed, charAllowed]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passRef.current?.select();
  };

  useEffect(() => {
    generatePassword();
  }, [numbersAllowed, length, charAllowed]);

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passRef}
        />
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex text-sm gap-x-1'>
          <input
            type="range"
            min={8}
            max={24}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(Number(e.target.value))}
            name=''
            id=''
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className='flex text-sm gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={numbersAllowed}
            onChange={() => setNumberAllowed((prev) =>!prev)}
            name=""
            id=""
          />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className='flex text-sm gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) =>!prev)}
            name=""
            id=""
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
