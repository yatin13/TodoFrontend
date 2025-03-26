import React, { useState } from "react";
import { addTodo } from "../redux/reducers/todoreducer";
import { useDispatch } from "react-redux";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

const AddTodo = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [todo, setTodo] = useState("");
  const [description,setDescription]=useState("")
  

  const add = () => {
    if (todo?.trim() === "") {
      toast.error("Title is Empty.");
      return;
    } if(description?.trim()===""){
      toast.error("Description is Empty.");
      return;
    }else {
     let body={title:todo,description};
     dispatch(addTodo(body)).then((res)=>{
        toast.success("Todo added successfully.")
        navigate("/todos");
     });
      setTodo("");
    }
  };
  return ( 
<form className="mt-6 max-w-lg mx-auto bg-gradient-to-br from-white to-gray-100 p-6 rounded-xl shadow-lg border border-gray-200">
  <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">📌 Create a New Task</h2>

  <div className="mb-4">
    <label htmlFor="newtask" className="block text-sm font-semibold text-gray-600 mb-2">
      Task Title
    </label>
    <input
      type="text"
      id="newtask"
      placeholder="e.g., Buy groceries"
      value={todo}
      onChange={(e) => setTodo(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="description" className="block text-sm font-semibold text-gray-600 mb-2">
      Task Description
    </label>
    <textarea
      id="description"
      placeholder="Details about the task..."
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      rows="3"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
    ></textarea>
  </div>

  <button
    type="button"
    onClick={add}
    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-200"
  >
    ➕ Add Task
  </button>
</form>
  );
};
export default AddTodo;