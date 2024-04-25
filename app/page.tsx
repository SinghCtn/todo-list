import React from "react";

const items = [
  "afsfdv",
  "Adsfga",
  "adsfSFA",
  "ASFDARGV",
  "Adsfga",
  "adsfSFA",
  "ASFDARGV",
  "Adsfga",
  "adsfSFA",
  "ASFDARGV",
  "Adsfga",
  "adsfSFA",
  "ASFDARGV",
  "Adsfga",
  "adsfSFA",
  "ASFDARGV",
  "Adsfga",
  "adsfSFA",
  "ASFDARGV",
  "Adsfga",
  "adsfSFA",
  "ASFDARGV",
  "Adsfga",
  "adsfSFA",
  "ASFDARGV",
];

export default function page() {
  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-t from-black via-pink-500 to-purple-400">
      <header className="h-20 flex justify-center items-center">
        <h1 className="text-5xl font-bold">TODO LIST</h1>
      </header>
      <h1 className="text-4xl m-10">
        Add the Tasks to the list:<span> </span>
      </h1>
      <form className="text-2xl flex justify-center items-center w-full ">
        <select className="bg-transparent border border-white rounded-xl p-3 w-36 mx-4 focus:outline-none">
          {Array.from({ length: 20 }, (_, i) => i + 1).map((val) => (
            <option value={val} key={val}>
              {val}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Task*"
          className="bg-transparent border border-white rounded-xl p-3 mx-4 focus:outline-none"
        />
        <button className="bg-transparent border border-white rounded-xl p-3 mx-4 focus:outline-none">
          Add Item
        </button>
      </form>

      <div className="bg-[#1a1a1a]/20 backdrop-opacity-10 m-10 w-[80%] h-[50vh]">
        <ul className="overflow-auto h-full w-full m-auto grid grid-cols-3 gap-4 justify-items-center">
          {items.map((item) => (
            <li key={item} className="text-2xl m-3 p-2 justify-items-center">
              <input type="checkbox" className="h-5 w-5" />
              <span className="inline-block w-44 px-2">{item} </span>
              <button className="text-red-600 text-4xl">&times;</button>
            </li>
          ))}
        </ul>
      </div>

      <div>Sorting</div>

      <footer>&copy; {new Date().getFullYear()} Chetan Singh</footer>
    </div>
  );
}
