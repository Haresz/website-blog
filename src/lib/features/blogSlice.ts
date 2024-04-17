import { getDataBlog } from "@/api/blog";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState: { blogs: [] } = {
  blogs: [],
};

const actionGetBlog = createAsyncThunk("blogs/actionGetBlog", async () => {
  const response = await getDataBlog();
  return response.data.result;
});

export const blogsSlice = createSlice({
  name: "blogsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actionGetBlog.fulfilled, (state, action) => {
      state.blogs = action.payload;
    });
  },
});

export { actionGetBlog, initialState };
export default blogsSlice.reducer;
