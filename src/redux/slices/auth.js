import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
	try {
		const { data } = await axios.post('/auth/login', params);
		return data;
	} catch (error) {
		console.log(error)
	}

});
export const fetchAuthMe = createAsyncThunk('fetchAuthMe', async () => {
	try {
		const { data } = await axios.get('/auth/me');
		return data
	} catch (error) {
		console.log(error);
	}
});
export const fetchRegisterUser = createAsyncThunk('fetchRegisterUser', async (params) => {
	try {
		const { data } = await axios.post('/auth/register', params);
		return data;
	} catch (error) {
		console.log(error);
	}
});

const initialState = {
	data: null,
	status: 'loading'
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null;
		}
	},
	extraReducers: {
		[fetchUserData.pending]: (state) => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchUserData.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchUserData.rejected]: (state) => {
			state.status = 'error'
			state.data = null;
		},
		[fetchAuthMe.pending]: (state) => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchAuthMe.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchAuthMe.rejected]: (state) => {
			state.status = 'error'
			state.data = null;
		},
		[fetchRegisterUser.pending]: (state) => {
			state.status = 'loading';
		},
		[fetchRegisterUser.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchRegisterUser.rejected]: (state) => {
			state.status = 'error';
		}
	}
});
export default authSlice.reducer;
export const { logout } = authSlice.actions;
export const isAuthSelector = state => Boolean(state.auth.data);
