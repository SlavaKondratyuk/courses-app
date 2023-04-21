import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../common/Button/Button';

import { Author, CourseInterface } from '../interfaces/interfaces';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchAuthors } from '../../store/authors/reducer';

import './Courses.css';

type CoursesProps = {
	addCourse: boolean;
};

export default function Courses(props: CoursesProps) {
	const pageToShow = props.addCourse ? false : true;
	const dispatch = useAppDispatch();
	const role = useAppSelector((state) => state.user.role);
	let fetchedCourses = useAppSelector<CourseInterface[]>(
		(state) => state.courses.courses
	);
	let fetchedAuthors = useAppSelector<Author[]>(
		(state) => state.authors.authors
	);
	const [courses, setCourses] = useState<CourseInterface[] | []>([]);
	const [authors, setAuthors] = useState<Author[] | []>([]);
	const [displayCourses, setDisplayCourses] = useState<boolean>(pageToShow);
	const navigate = useNavigate();

	useEffect(() => {
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

	return (
		<div className='courses'>
			<div className='search-bar__wrapper'>
				<SearchBar courses={courses} updateCoursesList={updateCoursesList} />
				{role === 'admin' ? (
					<Button name='Add New Course' clickHandler={coursesDisplayHandler} />
				) : null}
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
}
