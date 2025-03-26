import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authreducer } from "./reducers/authreducer";
import { todoreducer } from "./reducers/todoreducer";
const rootReducer = combineReducers({
    auth: authreducer,
    todo: todoreducer,
  });
const store = configureStore({
  reducer: rootReducer,
});

export default store;