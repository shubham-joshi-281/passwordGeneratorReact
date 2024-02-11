import { useEffect, useRef, useState } from "react";

const PasswordGenerator = () => {
  // useState hook
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [isNumber, setIsNumber] = useState(false);
  const [isChar, setIsChar] = useState(false);

  // useRef hook
  const passwordRef = useRef();

  //  Password Generator
  const passwordGenerator = () => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (isNumber) {
      str += "0123456789";
    }
    if (isChar) {
      str += "~!@#$%^&*()_+{}:";
    }

    for (let i = 0; i <= length; i++) {
      let rn = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(rn);
      setPassword(pass);
    }
  };

  //   useEffect hook
  useEffect(() => {
    passwordGenerator();
  }, [isChar, length, isNumber, setPassword]);

  //   copy functionality
  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    alert("copied");
  };
  return (
    <div className="flex justify-center items-center my-4 flex-col ">
      <h1 className="text-2xl">!! Password Generator !! </h1>
      <div className="my-6 border-2 p-2 md:w-[50vw] rounded-lg">
        <input
          className="border-1 px-3 text-black border-red-500 my-2 md:w-[43vw] w-[70vw] h-[6vh] mx-1 rounded-md bg-white"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          readOnly
          placeholder="Grenerate Password Here..."
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="border-1 px-3 py-2 bg-blue-800 rounded-md"
        >
          Copy
        </button>
        <div className="my-4 flex items-center gap-1.5 text-lg ">
          <input
            type="range"
            min={6}
            max={100}
            onChange={(e) => setLength(e.target.value)}
            value={length}
          />
          Length({length})
          <input
            type="checkbox"
            onChange={() => {
              setIsNumber((prev) => !prev);
            }}
            value={isNumber}
          />
          Number
          <input
            type="checkbox"
            onChange={() => {
              setIsChar((prev) => !prev);
            }}
            value={isChar}
          />
          Character
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
