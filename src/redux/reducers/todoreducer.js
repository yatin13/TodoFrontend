import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = [];

export const addTodo = createAsyncThunk("todos/addTodo", async (body) => {
  const userToken = localStorage.getItem("userToken");
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/todo/add`,
    body,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
  return response.data;
});

export const deleteToDo = createAsyncThunk("todos/deleteToDo", async (body) => {
  const { id } = body;
  const userToken = localStorage.getItem("userToken");
  const response = await axios.delete(
    `${process.env.REACT_APP_API_URL}/todo/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
  return response.data;
});
export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  const userToken = localStorage.getItem("userToken");
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/todo/get`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response.data.status ? response.data.data.todos : [];
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async (body) => {
  console.log(body,'id')
  const { id } = body;
  const userToken = localStorage.getItem("userToken");
  const response = await axios.patch(
    `${process.env.REACT_APP_API_URL}/todo/patch/${id}`,
     body ,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
  return response.data;
});

const todoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.pending, (state) => {
        return state;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        if (action.payload.status) {
        
        }
      })
      .addCase(addTodo.rejected, (state, action) => {
        return state;
      })
      .addCase(getTodos.pending, (state) => {
        return state || [];
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        if (action.payload) {
          console.log("action.payload get request",action.payload)
         return action.payload;  
        }
      })
      .addCase(getTodos.rejected, (state) => {
        return state;
      })
      .addCase(deleteToDo.pending, (state) => {
        return state;
      })
      .addCase(deleteToDo.fulfilled, (state, action) => {
        if (action.payload.status) {
          return state.filter(todo => todo._id !== action.meta.arg.id); 
        }
      })
      .addCase(deleteToDo.rejected, (state) => {
        return state;
      })
      .addCase(updateTodo.pending, (state) => {
        return state;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        if (action.payload.status) {
         
        }
      })
      .addCase(updateTodo.rejected, (state) => {
        return state;
      });
  },
});

export const todoreducer = todoReducer.reducer;
