import { createSlice } from "@reduxjs/toolkit";

const userSlices = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    addUser: (state, action) => {
      // console.log(action.payload )
      state.users = action.payload;
    },
  },
});

export const { addUser } = userSlices.actions;

export default userSlices.reducer;
