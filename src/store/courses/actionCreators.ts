import { coursesSlice } from './reducer';
import type { RootState } from '../store';

// Action creators are generated for each case reducer function
export const {
	addNewCourse,
	deleteCourse,
	initialiseCourses,
	coursesLoaded,
	updateCourse,
} = coursesSlice.actions;
export const selectCourses = (state: RootState) => state.courses;
