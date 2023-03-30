import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import CreateCourse from '../CreateCourse/CreateCourse';

import { mockedCoursesList, mockedAuthorsList } from '../constants';

import './Courses.css';
import Button from '../common/Button/Button';

export default function Courses(props) {
	const pageToShow = props.addCourse ? false : true;
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [displayCourses, setDisplayCourses] = useState(pageToShow);
	const [createdCoures, setCreatedCoures] = useState([]);
	const navigate = useNavigate();

	function updateCoursesList(filteredCourses) {
		if (!filteredCourses) {
			setCourses([...mockedCoursesList, ...createdCoures]);
			return;
		}

		setCourses(filteredCourses);
	}

	function coursesDisplayHandler() {
		displayCourses ? navigate('/courses/add') : navigate('/courses');
		setDisplayCourses(!displayCourses);
	}

	function addNewCourse(course) {
		setCourses([...courses, course]);
		setCreatedCoures([...createdCoures, course]);
	}

	function updateAuthorsList(author) {
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
						deleteHandler={() => console.log('Delete')}
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
