import React, { useEffect,useState } from "react";
import TodoItem from "./TodoItem";
import {getTodos,deleteToDo,updateTodo } from "../redux/reducers/todoreducer";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

const Todos = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();

  const todos = useSelector((state) => {
    return state.todo || [];
  });

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
   
  const removeTodo = (id) => {
    dispatch(deleteToDo({ id }))
      .then(() => {
        toast.success("Item Deleted Successfully")
        dispatch(getTodos())
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };


  
    const saveUpdates = (item,title,description) => {
      if(!title?.trim() || !description?.trim()){
        toast.error("Title or description cannot be empty");
        return;
      }
      dispatch(updateTodo({ id: item.id, title, description }))
        .then(() => {
          toast.success("Item Updated Successfully")
          dispatch(getTodos())    
        })
        .catch((error) => console.error("Error updating todo:", error));
    };
  return (
    <>
{todos?.length > 0 ? <div className="max-w-lg mx-auto mt-4 p-4 bg-white shadow-md rounded-md">
  <ul className="space-y-3">
    {todos.map((item) => (
      <TodoItem
        key={item.id}
        item={item}
        removeTodo={removeTodo}
        saveUpdates={saveUpdates}
      />
    ))}
  </ul>
</div> : <>
<div className="flex flex-col items-center justify-center h-52 bg-white border border-gray-300 text-gray-600 text-lg font-medium rounded-xl shadow-md p-6">
  <svg
    className="w-14 h-14 text-gray-400 mb-3"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4v16m8-8H4"
    ></path>
  </svg>
  <p className="text-xl font-semibold text-gray-700">No Todos Added Yet</p>
  <span className="text-sm text-gray-500 mt-1">Start by adding a new task.</span>
  <button
    onClick={() => navigate("/addTodo")}
    className="mt-4 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-full shadow-md hover:bg-blue-700 transition"
  >
    + Add Todo
  </button>
</div>

</>}
</>
  );
};

export default Todos;
