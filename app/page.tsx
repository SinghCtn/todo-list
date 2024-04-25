"use client";
import React, { ReactNode, useState } from "react";

type taskType = {
  _id: number | string | null;
  task: string;
  done: boolean;
};

export default function Page() {
  const [items, setItems] = useState<Array<taskType>>([]);

  const [task, setTask] = useState<taskType>({
    _id: null,
    task: "",
    done: false,
  });

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-t from-black via-pink-500 to-purple-400">
      <Header />
      <AddTask
        items={items}
        setItems={setItems}
        task={task}
        setTask={setTask}
      />
      <TaskList
        items={items}
        setItems={setItems}
        task={task}
        setTask={setTask}
      />
      <Sorting />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="h-20 flex justify-center items-center">
      <h1 className="text-5xl font-bold">TODO LIST</h1>
    </header>
  );
}

function AddTask({ items, task, setTask }: any) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    items.push(task);
    setTask({ _id: null, task: "", done: false });
  };

  const handleChange = (e: any) => {
    setTask((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
      _id: items.length + 1,
    }));
  };

  return (
    <>
      <h1 className="text-4xl m-10">Add the Tasks to the list:</h1>
      <form
        className="text-2xl flex justify-center items-center w-full"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Task*"
          className="bg-transparent border border-white rounded-xl p-3 mx-4 focus:outline-none w-80"
          name="task"
          onChange={handleChange}
          value={task.task}
        />
        <button className="bg-transparent border border-white rounded-xl p-3 mx-4 focus:outline-none">
          Add Item
        </button>
      </form>
    </>
  );
}

function TaskList({ items, task, setTask, setItems }: any) {
  const onToggleItem = (id: any) => {
    setItems((prevItems: any) =>
      prevItems.map((item: any) =>
        item._id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const handleDeleteTask = (id: any) => {
    setItems((prev: any) => prev.filter((item: any) => item._id !== id));
  };

  return (
    <div className="bg-[#1a1a1a]/20 backdrop-opacity-10 m-10 w-[80%] h-[50vh]">
      <ul className="overflow-auto h-full w-full m-auto grid auto-rows-max grid-cols-3 gap-4 justify-items-center ">
        {items.map((item: any) => (
          <li key={item._id} className="text-2xl m-3 p-2 justify-items-center">
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => onToggleItem(item._id)}
              className="h-5 w-5"
            />
            <span
              className={`inline-block w-44 px-2 ${
                item.done ? "line-through decoration-red-700 decoration-4 " : ""
              }`}
            >
              {item.task}
            </span>
            <button
              className="text-red-600 text-4xl"
              onClick={() => handleDeleteTask(item._id)}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Sorting() {
  return (
    <div className="m-6">
      <select className="bg-transparent border border-white rounded-xl p-3 mx-4 focus:outline-none text-2xl w-64">
        <option value="" className="text-black p-3">
          Latest first
        </option>
        <option value="" className="text-black">
          Old first
        </option>
        <option value="" className="text-black">
          Alphabatically
        </option>
      </select>
    </div>
  );
}

function Footer() {
  return (
    <footer className="m-6 text-2xl mb-10">
      &copy; {new Date().getFullYear()} Chetan Singh
    </footer>
  );
}
