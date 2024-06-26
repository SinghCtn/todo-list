"use client";
import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type taskType = {
  _id: number | string | null;
  todoTask: string;
  done: boolean;
};

export default function Page() {
  const [items, setItems] = useState<Array<taskType>>([]);

  const [task, setTask] = useState<taskType>({
    _id: null,
    todoTask: "",
    done: false,
  });

  const handleDeleteTask = async (id: any) => {
    await axios.delete(`/api/todo/${id}`);

    const response = await axios.get("/api/todo");
    setItems(response.data.tasks);
  };

  const onToggleItem = async (id: any, done: boolean) => {
    const request = await axios.patch(`/api/todo/${id}`, { done: done });
    console.log(request);
    const response = await axios.get("/api/todo");
    setItems(response.data.tasks);

    // setItems((prevItems: any) =>
    //   prevItems.map((item: any) =>
    //     item._id === id ? { ...item, done: !item.done } : item
    //   )
    // );
  };

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
        handleDeleteTask={handleDeleteTask}
        onToggleItem={onToggleItem}
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

function AddTask({ items, task, setTask, setItems }: any) {
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/todo");
        setItems(response.data.tasks);
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
      }
    };
    fetchTasks();
  }, [setItems]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimedTask = { ...task, todoTask: task.todoTask.trim() };

    if (trimedTask.todoTask !== "") {
      try {
        await axios.post("/api/todo", trimedTask);

        const response = await axios.get("/api/todo");

        setItems(response.data.tasks);
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
    setTask({ id: null, todoTask: "", done: false });
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
          name="todoTask"
          onChange={handleChange}
          value={task.todoTask}
        />

        <button className="bg-transparent border border-white rounded-xl p-3 mx-4 focus:outline-none">
          Add Item
        </button>
      </form>
    </>
  );
}

function TaskList({ items, setItems, handleDeleteTask, onToggleItem }: any) {
  return (
    <div className="bg-[#1a1a1a]/20 backdrop-opacity-10 m-10 w-[80%] h-[50vh]">
      <ul className="overflow-auto h-full w-full m-auto grid auto-rows-max grid-cols-3 gap-4 justify-items-center ">
        {items.map((item: any) => (
          <li key={item._id} className="text-2xl m-3 p-2 justify-items-center">
            <input
              type="checkbox"
              checked={item.done}
              onChange={(e) => onToggleItem(item._id, e.target.checked)}
              className="h-5 w-5"
            />
            <span
              className={`inline-block w-44 px-2 ${
                item.done ? "line-through decoration-red-700 decoration-4 " : ""
              }truncate`}
            >
              {item.todoTask}
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
