import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import CreateCourse from '../CreateCourse/CreateCourse';
import Button from '../common/Button/Button';

import { mockedCoursesList, mockedAuthorsList } from '../constants';
import { Author, CourseInterface } from '../interfaces/interfaces';

import './Courses.css';

type CoursesProps = {
	addCourse: boolean;
};

export default function Courses(props: CoursesProps) {
	const pageToShow = props.addCourse ? false : true;
	const [courses, setCourses] = useState<CourseInterface[]>(mockedCoursesList);
	const [authors, setAuthors] = useState<Author[]>(mockedAuthorsList);
	const [displayCourses, setDisplayCourses] = useState<boolean>(pageToShow);
	const [createdCoures, setCreatedCoures] = useState<CourseInterface[] | []>(
		[]
	);
	const navigate = useNavigate();

	function updateCoursesList(
		filteredCourses: CourseInterface[] | undefined
	): void {
		if (!filteredCourses) {
			setCourses([...mockedCoursesList, ...createdCoures]);
			return;
		}

		setCourses(filteredCourses);
	}

	function coursesDisplayHandler(): void {
		displayCourses ? navigate('/courses/add') : navigate('/courses');
		setDisplayCourses(!displayCourses);
	}

	function addNewCourse(course: CourseInterface): void {
		setCourses([...courses, course]);
		setCreatedCoures([...createdCoures, course]);
	}

	function updateAuthorsList(author: Author[]): void {
		setAuthors(author);
	}

	if (displayCourses) {
		return (
			<div className='courses'>
				<div className='search-bar__wrapper'>
					<SearchBar courses={courses} updateCoursesList={updateCoursesList} />
					<Button name='Add New Course' clickHandler={coursesDisplayHandler} />
				</div>

				{courses.map((course) => (
					<CourseCard
						key={course.id}
						id={course.id}
						title={course.title}
						description={course.description}
						authors={course.authors}
						duration={course.duration}
						creationDate={course.creationDate}
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
				createCourse={addNewCourse}
			/>
		);
	}
}
