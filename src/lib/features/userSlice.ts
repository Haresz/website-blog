import { getDataUser, getDetailUser } from "@/api/user";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState: { user: {} } = {
  user: {},
};

const actionGetUser = createAsyncThunk(
  "blogs/actionGetBlog",
  async (id: any) => {
    const response = await getDetailUser(id);
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
    });
  },
});

export { actionGetUser, initialState };
export default userSlice.reducer;
