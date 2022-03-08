import { configureStore } from '@reduxjs/toolkit'
import { postReducer } from './post/postSlice'
import thunk from 'redux-thunk'

const store = configureStore({  
    reducer: {
        post: postReducer
    }
})

export default store