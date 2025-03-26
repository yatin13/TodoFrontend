import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    user:null
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (body) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, body);
    return response.data;
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (body) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, body);
    return response.data;
  }
);

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.user=null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user=action.payload;
        localStorage.setItem("userToken",action.payload.token)
      })
      .addCase(loginUser.rejected, (state,action) => {
        toast.error("Login Failed!")
        state.user=null; 
      })
      .addCase(signupUser.pending, (state) => {
        state.user=null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.user=action.payload;
          localStorage.setItem("userToken",action.payload.token)
        }
      })
      .addCase(signupUser.rejected, (state) => {
        toast.error("Signup Failed!")
        state.user=null;
      });
  },
});

  export const authreducer = authReducer.reducer;