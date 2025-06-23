import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// API endpoint
const API_URL = 'http://localhost:5000/api/users';

// Async thunk for saving user data
export const saveUser = createAsyncThunk('users/saveUser',async (userData) => {
        try {
            const response = await axios.post(API_URL, userData);
            return response.data;
        } catch (error) {
            throw Error(error.response.data.message);
        }
    });

    export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
            try {
            const response = await axios.get('http://localhost:5000/api/users');
    return response.data;
        } catch (error) {
            throw Error(error.response.data.message);
        }
  
});

export const fetchUsersDelete = createAsyncThunk(
  'users/fetchUsersDelete',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      return id; // Return the id to remove it from the Redux store
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Delete failed');
    }
  }
);




const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: 'false', // false indicates not loading, true indicates loading
        error: null,
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            // Save user cases
            .addCase(saveUser.pending, (state) => {
                state.status = 'true';
            })
            .addCase(saveUser.fulfilled, (state, action) => {
                state.status = 'false';
                state.users.push(action.payload);
            })
            .addCase(saveUser.rejected, (state, action) => {
                state.status = 'false';
                state.error = action.error.message;
            })
            .addCase(fetchUsers.pending, (state) => {
    state.status = 'true';
})
.addCase(fetchUsers.fulfilled, (state, action) => {
    state.status = 'false';
    state.users = action.payload;
})
.addCase(fetchUsers.rejected, (state, action) => {
    state.status = 'false';
    state.error = action.error.message;
})

//delete user
.addCase(fetchUsersDelete.pending, (state) => {
    state.status = 'true';
})

.addCase(fetchUsersDelete.fulfilled, (state, action) => {
    state.status = 'false';
    state.users = state.users.filter(user => user._id !== action.payload);
})
.addCase(fetchUsersDelete.rejected, (state, action) => {
    state.status = 'false';
    state.error = action.error.message;
});

        
    }
});

export default userSlice.reducer;
