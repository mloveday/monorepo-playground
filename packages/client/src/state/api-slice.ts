import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

type Api = "express" | "java";

type ApiState = {
  api: Api;
};

const initialState: ApiState = {
  api: "express",
};

export const apiSlice = createSlice({
  name: "apiSelection",
  initialState,
  reducers: {
    setApi: (state, action: PayloadAction<Api>) => {
      state.api = action.payload;
    },
  },
});
