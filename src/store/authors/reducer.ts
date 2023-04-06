import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetAuthors } from '../../services';

import { AuthorsStateInterface } from './actionTypes';

const initialState: AuthorsStateInterface = {
	authors: [],
	loading: false,
	error: undefined,
};

export const fetchAuthors = createAsyncThunk(
	'authors/fetchAuthors',
	async () => {
		const response = await GetAuthors();
		return response.data.result;
	}
);

export const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {
		addNewAuthor: (state, action) => {
			state.authors = action.payload;
		},
		deleteAuthor: (state, action) => {
			const index = state.authors.findIndex(
				(author) => author.id === action.payload
			);
			state.authors.splice(index, 1);
		},
		initialiseAuthors: (state, action) => {
			state.authors = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAuthors.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchAuthors.fulfilled, (state, action) => {
			state.authors = action.payload;
			state.loading = false;
			state.error = undefined;
		});
		builder.addCase(fetchAuthors.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

export default authorsSlice.reducer;
