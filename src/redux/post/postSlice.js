import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllPosts = createAsyncThunk(
  'posts/getPosts',
  async (thunkAPI) => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return data
})

export const getSinglePost = createAsyncThunk(
  'posts/getSinglePost',
  async(id) => {
    const { data } =  await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return data
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
      builder.addCase(getSinglePost.fulfilled, (state, action) => {
        // Add user to the state array
        state.loading = false
        state.singlePost = action.payload
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
