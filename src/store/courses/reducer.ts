import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CourseStateInterface } from './actionTypes';

import { GetCourses } from '../../services';

const initialState: CourseStateInterface = {
	courses: [],
	loading: false,
	loaded: false,
	error: null,
};

export const fetchCourses = createAsyncThunk(
	'courses/fetchCourses',
	async () => {
		const response = await GetCourses();
		return response.data.result;
	}
);

export const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		addNewCourse: (state, action) => {
			state.courses.push(action.payload);
		},
		deleteCourse: (state, action) => {
			const index = state.courses.findIndex(
				(course) => course.id === action.payload
			);
			state.courses.splice(index, 1);
		},
		initialiseCourses: (state, action) => {
			state.courses = action.payload;
		},
		coursesLoaded: (state) => {
			state.loaded = true;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCourses.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchCourses.fulfilled, (state, action) => {
			state.courses = action.payload;
			state.loading = false;
			state.error = null;
		});
		builder.addCase(fetchCourses.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message ?? null;
		});
	},
});

export default coursesSlice.reducer;
