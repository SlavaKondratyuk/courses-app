import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { mockedCoursesList, mockedAuthorsList } from '../constants';

import Button from '../common/Button/Button';

import './CourseInfo.css';

export default function CourseInfo(props) {
	const { courseId } = useParams();
	console.log(mockedCoursesList);
	const filteredCourse = mockedCoursesList.find(
		(course) => course.id === courseId
	);
	const authors = mockedAuthorsList.filter((author) =>
		filteredCourse.authors.includes(author.id)
	);
	const authorsNames = authors.map((author) => author.name);

	return (
		<div className='course-info-wrapper'>
			<Link className='step-back-Link' rel='stylesheet' to='/courses'>
				{'<'} Back To Courses
			</Link>
			<h1>{filteredCourse.title}</h1>
			<div className='info-div'>
				<div className='info-description'>
					<p>{filteredCourse.description}</p>
				</div>
				<div className='info-filteredCourse'>
					<p>
						<span>ID:</span> {filteredCourse.id}
					</p>
					<p>
						<span>Duration:</span> {filteredCourse.duration}
					</p>
					<p>
						<span>Created:</span> {filteredCourse.creationDate}
					</p>
					<p>
						<span>Authors:</span> {authorsNames.join(', ')}
					</p>
				</div>
			</div>
		</div>
	);
}
