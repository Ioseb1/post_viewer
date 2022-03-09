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

export const deleteSinglePost = createAsyncThunk(
  'posts/deleteSinglePost',
  async(id) => {
    const { data } =  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return data
  }
)

export const getPostComments = createAsyncThunk(
  'posts/getSinglePostComments',
  async(id) => {
    const { data } =  await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    return data
  }
)

export const createComment = createAsyncThunk(
  'posts/postComment',
  async(postId, name, email, body) => {
    const config = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: { 
          "postId": postId,
          "name": name,
          "email": email,
          "body": body
        }
      }
      const { data } =  await axios.post(`https://jsonplaceholder.typicode.com/comments`, config)
      return data
    }
)

export const getPostByUser = createAsyncThunk(
  'posts/getSingleUserPosts',
  async(id) => {
    const { data } =  await axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    return data
  }
)

export const postSlice = createSlice({
    name: 'posts',
    initialState: {
      loading: false,
      posts: [],
      singlePost: {},
      error: {},
      deleted: false,
      postComments: [],
      userPosts: [],
      userComment: {}
    },
    reducers: {
      clearGetPostsByUser(state) {
        state.userPosts = []
      },
      clearUserComment(state) {
        state.userComment = {}
      }
    },
    extraReducers: (builder) => {
      builder.addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts.push(action.payload)
      })
      builder.addCase(getSinglePost.fulfilled, (state, action) => {
        state.loading = false
        state.singlePost = action.payload
      })
      builder.addCase(deleteSinglePost.fulfilled, (state, action) => {
        state.loading = false
        state.deleted = true
      })
      builder.addCase(getPostComments.fulfilled, (state, action) => {
        state.loading = false
        state.postComments.push(action.payload)
      })
      builder.addCase(getPostByUser.fulfilled, (state, action) => {
        state.loading = false
        state.userPosts.push(action.payload)
      })
      builder.addCase(createComment.fulfilled, (state, action) => {
        state.loading = false
        state.userComment = action.payload
      })
    }
  })
  
  export const { clearGetPostsByUser, clearUserComment } = postSlice.actions
  export const postReducer = postSlice.reducer
