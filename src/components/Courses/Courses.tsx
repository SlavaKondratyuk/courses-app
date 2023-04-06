import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import CreateCourse from '../CreateCourse/CreateCourse';
import Button from '../common/Button/Button';

import { mockedCoursesList, mockedAuthorsList } from '../constants';
import { Author, CourseInterface } from '../interfaces/interfaces';

import { GetAuthors } from '../../services';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addNewCourse } from '../../store/courses/actionCreators';
import { addNewAuthor } from '../../store/authors/actionCreators';
import { fetchCourses } from '../../store/courses/reducer';
import { fetchAuthors } from '../../store/authors/reducer';

import './Courses.css';

type CoursesProps = {
	addCourse: boolean;
};

export default function Courses(props: CoursesProps) {
	const pageToShow = props.addCourse ? false : true;
	const dispatch = useAppDispatch();
	let fetchedCourses = useAppSelector<CourseInterface[]>(
		(state) => state.courses.courses
	);
	let fetchedAuthors = useAppSelector<Author[]>(
		(state) => state.authors.authors
	);
	const [courses, setCourses] = useState<CourseInterface[] | []>([]);
	const [authors, setAuthors] = useState<Author[] | []>([]);
	const [displayCourses, setDisplayCourses] = useState<boolean>(pageToShow);
	const [createdCoures, setCreatedCoures] = useState<CourseInterface[] | []>(
		[]
	);
	const navigate = useNavigate();

	useEffect(() => {
		if (!fetchedCourses.length) {
			dispatch(fetchCourses());
		}
		if (!fetchedAuthors.length) {
			dispatch(fetchAuthors());
		}

		if (fetchedCourses.length !== 0) {
			setCourses(fetchedCourses);
		}

		if (fetchedAuthors.length !== 0) {
			setAuthors(fetchedAuthors);
		}
	}, [dispatch, fetchedCourses, fetchedAuthors]);

	const updateCoursesList = useCallback(
		(filteredCourses: CourseInterface[] | undefined) => {
			if (!filteredCourses) {
				setCourses(fetchedCourses);
				return;
			}

			setCourses(filteredCourses);
		},
		[fetchedCourses]
	);

	function coursesDisplayHandler(): void {
		displayCourses ? navigate('/courses/add') : navigate('/courses');
		setDisplayCourses(!displayCourses);
	}

	const dispatchNewCourse = useCallback(
		(course: CourseInterface): void => {
			dispatch(addNewCourse(course));
			setCourses(fetchedCourses);
		},
		[dispatch, fetchedCourses]
	);

	const updateAuthorsList = useCallback(
		(authors: Author[]): void => {
			dispatch(addNewAuthor(authors));
			setAuthors(authors);
		},
		[dispatch]
	);

	if (displayCourses) {
		return (
			<div className='courses'>
				<div className='search-bar__wrapper'>
					<SearchBar courses={courses} updateCoursesList={updateCoursesList} />
					<Button name='Add New Course' clickHandler={coursesDisplayHandler} />
				</div>
				{courses?.map((course) => (
					<CourseCard
						key={course?.id}
						id={course?.id}
						title={course?.title}
						description={course?.description}
						authors={course?.authors}
						duration={course?.duration}
						creationDate={course?.creationDate}
						mockedAuthors={authors}
					/>
				))}
			</div>
		);
	} else {
		return (
			<CreateCourse
				name='Create Course'
				courseAuthors={authors}
				updateAuthors={updateAuthorsList}
				clickHandler={coursesDisplayHandler}
				createCourse={dispatchNewCourse}
			/>
		);
	}
}
