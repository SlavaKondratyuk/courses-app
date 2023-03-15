import React from 'react';

import CourseCard from './components/CourseCard/CourseCard';

import {
	mockedCoursesList,
	mockedAuthorsList,
} from '../../assets/MockData/MockData';

import './Courses.css';

class Courses extends React.Component {
	render() {
		const mockedCourses = mockedCoursesList;
		const mockedAuthors = mockedAuthorsList;

		return (
			<div className='courses'>
				{mockedCourses.map((course) => (
					<CourseCard
						key={course.id}
						title={course.title}
						description={course.description}
						authors={course.authors}
						duration={course.duration}
						created={course.created}
						mockedAuthors={mockedAuthors}
						deleteHandler={() => console.log('Delete')}
					/>
				))}
			</div>
		);
	}
}

export default Courses;
