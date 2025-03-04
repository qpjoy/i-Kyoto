import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "@/states/variables";

const initialState = {
  helpers: []
};

export const fetchHelpers = createAsyncThunk("help/fetchHelpers", async ({}, thunkApi) => {
  const response = await fetch(`${url}/helps`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  return data;
});

const helpSlice = createSlice({
  name: "help",
  initialState,
  reducers: {
    setHelpers: (state, action) => {
      state.helpers = action.payload;
    }
  },
  extraReducers: (builder) =>
    builder
      // .addCase(fetchHelpers.pending, (state, action) => {
      //   state.login.status = "loading";
      // })
      .addCase(fetchHelpers.fulfilled, (state, action) => {
        console.log(`[Success]: Fulfill fetchHelpers `, state, action);
        const statusCode = action.payload.statusCode;

        if (statusCode === 200) {
          state.helpers = action.payload.data;
        } else if (statusCode === 400) {
          console.log(`[fetchHelpers Reducer]: 出现问题！`);
        }
      })
      .addCase(fetchHelpers.rejected, (state, action) => {
        console.log(`[fetchHelpers Reducer]: error！`);
      })
});

export default helpSlice;

export const { setHelpers } = helpSlice.actions;
export const getHelpers = (state) => state.help.helpers;
