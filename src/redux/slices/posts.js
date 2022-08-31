import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, thunkApi) => {
	try {
		const { data } = await axios.get('/posts');
		return data;
	} catch (error) {
		return thunkApi.rejectWithValue(error.message)
	}
});
export const fetchTags = createAsyncThunk('tags/fetchTags', async (_, thunkApi) => {
	try {
		const { data } = await axios.get('/tags');
		return data;
	} catch (error) {
		return thunkApi.rejectWithValue('error')
	}
});
export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
	try {
		await axios.delete(`/posts/${id}`);
	} catch (error) {
		console.log(error)
	}
});
export const fetchPopularPosts = createAsyncThunk('posts/fetchPopularPosts', async (_, thunkApi) => {
	try {
		const { data } = await axios.get('/popular');
		return data;
	} catch (error) {
		return thunkApi.rejectWithValue(error.message)
	}
});
export const fetchPostsByTag = createAsyncThunk('posts/fetchPostsByTag', async (tag, thunkApi) => {
	try {
		const { data } = await axios.get(`/posts/tags/${tag}`);
		return data;
	} catch (error) {
		return thunkApi.rejectWithValue(error.message)
	}
});

const initialState = {
	posts: {
		items: [],
		status: 'loading',
		error: null,
	},
	tags: {
		items: [],
		status: 'loading',
		error: null,
	}
}

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchPosts.pending]: (state) => {
			state.posts.items = [];
			state.posts.status = 'loading';
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.status = 'loaded';
			state.posts.items = action.payload;
		},
		[fetchPosts.rejected]: (state, action) => {
			state.posts.items = [];
			state.posts.error = action.payload;
		},


		[fetchTags.pending]: (state) => {
			state.tags.items = [];
			state.tags.status = 'loading';
		},
		[fetchTags.fulfilled]: (state, action) => {
			state.tags.status = 'loaded';
			state.tags.items = action.payload;
		},
		[fetchTags.rejected]: (state, action) => {
			state.tags.items = [];
			state.tags.error = action.payload;
		},


		[fetchRemovePost.pending]: (state, action) => {
			state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
		},


		[fetchPopularPosts.pending]: (state) => {
			state.posts.items = [];
			state.posts.status = 'loading';
		}, [fetchPopularPosts.fulfilled]: (state, action) => {
			state.posts.status = 'loaded';
			state.posts.items = action.payload;
		},
		[fetchPopularPosts.rejected]: (state, action) => {
			state.posts.items = [];
			state.posts.error = action.payload;
		},


		[fetchPostsByTag.pending]: (state) => {
			state.posts.items = [];
			state.posts.status = 'loading';
		}, [fetchPostsByTag.fulfilled]: (state, action) => {
			state.posts.status = 'loaded';
			state.posts.items = action.payload;
		},
		[fetchPostsByTag.rejected]: (state, action) => {
			state.posts.items = [];
			state.posts.error = action.payload;
		},
	}
})
export default postsSlice.reducer