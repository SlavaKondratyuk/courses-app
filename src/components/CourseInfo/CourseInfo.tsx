import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { mockedCoursesList, mockedAuthorsList } from '../constants';
import { Author, CourseInterface } from '../interfaces/interfaces';

import './CourseInfo.css';

export default function CourseInfo() {
	const { courseId } = useParams();
	const filteredCourse: CourseInterface | undefined = mockedCoursesList.find(
		(course) => course.id === courseId
	);
	const authors: Author[] | undefined = mockedAuthorsList.filter((author) =>
		filteredCourse?.authors.includes(author.id)
	);
	const authorsNames = authors.map((author) => author.name);

	return (
		<div className='course-info-wrapper'>
			<Link className='step-back-Link' rel='stylesheet' to='/courses'>
				{'<'} Back To Courses
			</Link>
			<h1>{filteredCourse?.title}</h1>
			<div className='info-div'>
				<div className='info-description'>
					<p>{filteredCourse?.description}</p>
				</div>
				<div className='info-filteredCourse'>
					<p>
						<span>ID:</span> {filteredCourse?.id}
					</p>
					<p>
						<span>Duration:</span> {filteredCourse?.duration}
					</p>
					<p>
						<span>Created:</span> {filteredCourse?.creationDate}
					</p>
					<p>
						<span>Authors:</span> {authorsNames.join(', ')}
					</p>
				</div>
			</div>
		</div>
	);
}
