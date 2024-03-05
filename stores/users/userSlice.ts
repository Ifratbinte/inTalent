"use client";

import { UserInterface } from "#interfaces/index";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserSliceInterface {
  data: UserInterface | null;
}

const initialState: UserSliceInterface = {
  data: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserInterface>) => {
      state.data = action.payload;
    },
    removeUser: (state) => {
      state.data = null;
    },
  },
});

export default userSlice.reducer;

export const { addUser, removeUser } = userSlice.actions;
