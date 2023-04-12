import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { CourseStateInterface } from './actionTypes';
import {
	addNewCourse,
	deleteCourse,
	initialiseCourses,
	coursesLoaded,
} from './actionCreators';

import { CourseInterface } from '../../components/interfaces/interfaces';
import { RootState } from '../store';

import { GetCourses } from '../../services';

// Fetch courses from server
export const fetchCoursesThunk =
	(): ThunkAction<void, RootState, unknown, Action<string>> =>
	async (dispatch, getState) => {
		const coursesState: RootState = getState();
		try {
			if (!coursesState.courses.loaded) {
				const courses = await GetCourses();
				dispatch(initialiseCourses(courses.data.result));
				dispatch(coursesLoaded());
			}
		} catch (error) {
			console.error(error);
		}
	};

// Add a new course
export const addNewCourseThunk =
	(
		course: CourseInterface
	): ThunkAction<void, CourseStateInterface, unknown, Action<string>> =>
	(dispatch) => {
		dispatch({
			type: 'courses/addNewCourse',
			payload: course,
		});
	};

// Delete a course
export const deleteCourseThunk =
	(
		id: string
	): ThunkAction<void, CourseStateInterface, unknown, Action<string>> =>
	(dispatch, getState) => {
		const { courses } = getState();
		const index = courses.findIndex((course) => course.id === id);

		if (index !== -1) {
			dispatch({
				type: 'courses/deleteCourse',
				payload: id,
			});
		}
	};

// Initialise courses
export const initialiseCoursesThunk =
	(
		courses: CourseInterface[]
	): ThunkAction<void, CourseStateInterface, unknown, Action<string>> =>
	(dispatch) => {
		dispatch({
			type: 'courses/initialiseCourses',
			payload: courses,
		});
	};
