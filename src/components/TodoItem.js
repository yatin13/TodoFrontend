import React, { useRef, useState } from "react";
import {  getTodos, updateTodo } from "../redux/reducers/todoreducer";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import {toast} from "react-toastify";

const TodoItem = ({ item ,removeTodo,saveUpdates}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  // State for edit mode and input values

  const [title, setTitle] = useState(item?.title?.trim());
  const [description, setDescription] = useState(item?.description?.trim());
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      titleRef.current?.focus();
      descriptionRef.current?.focus(); // Focus both fields sequentially
    }, 0);
  };


  const updatePreviousValues=()=>{
    if(title?.trim()===""){
      setTitle(item?.title?.trim())
    }

    if(description?.trim()===""){
      setDescription(item?.description?.trim())
    }
  }

  return (
<li className="border border-gray-300 rounded-lg shadow-sm p-4 mb-3 bg-gray-50">
  <form className="space-y-3">
    {/* Title Input */}
    <textarea
      ref={titleRef}
      disabled={!isEditing}
      value={title}
      onChange={(e) => setTitle(e?.target?.value)}
      rows={2}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 disabled:bg-gray-200"
    />

    {/* Description Input */}
    <textarea
      ref={descriptionRef}
      disabled={!isEditing}
      value={description}
      onChange={(e) => setDescription(e?.target?.value)}
      rows={3}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 disabled:bg-gray-200"
    />

    {/* Buttons */}
    <div className="flex flex-wrap gap-2">
      {/* Edit/Save Button */}
      <button
        type="button"
        onClick={() => isEditing ? (setIsEditing(false), saveUpdates(item, title, description),updatePreviousValues()) : enableEditing()}
        className={`px-3 py-1 rounded-md text-white transition ${
          isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'
        }`}
      >
        {isEditing ? 'Save' : 'Edit'}
      </button>

      {/* Mark as Complete/Incomplete */}
      <button
        type="button"
        onClick={() => dispatch(updateTodo({ id: item.id, marked: !item.marked })).then(() => dispatch(getTodos()))}
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition"
      >
        {item.marked ? 'Mark as Incomplete' : 'Mark as Complete'}
      </button>

      {/* Delete Button */}
      <button
        type="button"
        onClick={() => removeTodo(item.id)}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition"
      >
        Delete
      </button>
    </div>

    {/* Done Status */}
    {item.marked && <span className="text-green-600 font-semibold">✔ Done!</span>}
  </form>
</li>
  );
};

export default TodoItem;
