import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "@/states/variables";

const initialState = {
  messages: []
};

export const fetchMessages = createAsyncThunk("message/fetchMessages", async ({}, thunkApi) => {
  const response = await fetch(`${url}/messages`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  return data;
});

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    }
  },
  extraReducers: (builder) =>
    builder
      // .addCase(fetchmessageers.pending, (state, action) => {
      //   state.login.status = "loading";
      // })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        console.log(`[Success]: Fulfill fetchmessageers `, state, action);
        const statusCode = action.payload.statusCode;

        if (statusCode === 200) {
          state.messages = action.payload.data;
        } else if (statusCode === 400) {
          console.log(`[fetchMessages Reducer]: 出现问题！`);
        }
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        console.log(`[fetchMessages Reducer]: error！`);
      })
});

export default messageSlice;

export const { setMessages } = messageSlice.actions;
export const getMessages = (state) => state.message.messages;
