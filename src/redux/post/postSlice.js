import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// const initialState = {
//   loading: false,
//   posts: [],
//   singlePost: {},
//   error: {}
// };

export const getAllPosts = createAsyncThunk(
  'posts/getPosts',
  async (thunkAPI) => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return data
})

const getSinglePost = createAsyncThunk(
  'posts/getSinglePost',
  async(id) => {
    const res =  await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then(
      (data) => data.json()
    )
    return res
  }
)

export const postSlice = createSlice({
    name: 'posts',
    initialState: {
      loading: false,
      posts: [],
      singlePost: {},
      error: {}
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getAllPosts.fulfilled, (state, action) => {
        // Add user to the state array
        state.loading = false
        state.posts.push(action.payload)
      })
      // [getAllPosts.pending]: (state) => {
      //   state.loading = true
      // },
      // [getAllPosts.fulfilled]: (state, { payload }) => {
      //   console.log(payload);
      //   state.loading = false
      //   state.posts.push(payload)
      // },
      // [getAllPosts.rejected]: (state) => {
      //   state.loading = false
      // },
    }
  })
  
  export const postReducer = postSlice.reducer
