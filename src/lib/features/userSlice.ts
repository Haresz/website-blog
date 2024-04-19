import { getDetailUser } from "@/api/user";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState: { user: {} } = {
  user: {},
};

const actionGetUser = createAsyncThunk(
  "users/actionGetUser",
  async (userId: string) => {
    const response = await getDetailUser(userId);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actionGetUser.fulfilled, (state, action) => {
      state.user = action.payload;
      console.log(state.user, action.payload, "userSlice");
    });
  },
});

export { actionGetUser, initialState };
export default userSlice.reducer;
