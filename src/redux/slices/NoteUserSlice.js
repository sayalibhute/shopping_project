// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // API endpoint
// const API_URL = 'http://localhost:5000/api/users';

// // Async thunk for saving user data
// export const saveUser = createAsyncThunk(
//     'noteUsers/saveUser',
//     async (userData) => {
//         try {
//             const response = await axios.post(API_URL, userData);
//             return response.data;
//         } catch (error) {
//             throw Error(error.response.data.message);
//         }
//     }
// );

// // Async thunk for fetching users
// export const fetchUsers = createAsyncThunk(
//     'noteUsers/fetchUsers',
//     async () => {
//         try {
//             const response = await axios.get(API_URL);
//             return response.data;
//         } catch (error) {
//             throw Error(error.response.data.message);
//         }
//     }
// );

// const noteUserSlice = createSlice({
//     name: 'noteUsers',
//     initialState: {
//         users: [],
//         status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             // Save user cases
//             .addCase(saveUser.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(saveUser.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.users.push(action.payload);
//             })
//             .addCase(saveUser.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             // Fetch users cases
//             .addCase(fetchUsers.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchUsers.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.users = action.payload;
//             })
//             .addCase(fetchUsers.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             });
//     }
// });

// export default noteUserSlice.reducer;
