import React from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import CreateCourse from '../CreateCourse/CreateCourse';

import {
	mockedCoursesList,
	mockedAuthorsList,
} from '../../assets/MockData/MockData';

import './Courses.css';
import Button from '../common/Button/Button';

class Courses extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			courses: mockedCoursesList,
			authors: mockedAuthorsList,
			displayCourses: true,
		};

		this.updateCoursesList = this.updateCoursesList.bind(this);
		this.coursesDisplayHandler = this.coursesDisplayHandler.bind(this);
	}

	updateCoursesList(filteredCourses) {
		if (!filteredCourses) {
			this.setState({ courses: mockedCoursesList });
			return;
		}

		this.setState({ courses: filteredCourses });
	}

	coursesDisplayHandler = () => {
		this.setState({ displayCourses: !this.state.displayCourses });
	};

	render() {
		const mockedCourses = this.state.courses;
		const mockedAuthors = this.state.authors;

		if (this.state.displayCourses) {
			return (
				<div className='courses'>
					<div className='search-bar__wrapper'>
						<SearchBar
							courses={mockedCourses}
							updateCoursesList={this.updateCoursesList}
						/>
						<Button
							name='Add New Course'
							clickHandler={this.coursesDisplayHandler}
						/>
					</div>

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
		} else {
			return (
				<CreateCourse
					name='Create Course'
					authors={mockedAuthors}
					clickHandler={this.coursesDisplayHandler}
				/>
			);
		}
	}
}

export default Courses;
