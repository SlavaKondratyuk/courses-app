import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import {
	mockedCoursesList,
	mockedAuthorsList,
} from '../../assets/MockData/MockData';

import Button from '../common/Button/Button';

import './CourseInfo.css';

export default function CourseInfo(props) {
	const { courseId } = useParams();
	const cousre = mockedCoursesList.find((course) => course.id === courseId);
	const authors = mockedAuthorsList.filter((author) =>
		cousre.authors.includes(author.id)
	);
	const authorsNames = authors.map((author) => author.name);

	return (
		<div className='course-info-wrapper'>
			<Link className='step-back-Link' rel='stylesheet' to='/courses'>
				{'<'} Back To Courses
			</Link>
			<h1>{cousre.title}</h1>
			<div>
				<p>{cousre.description}</p>
			</div>
			<div>
				<p>Id: {cousre.id}</p>
				<p>Duration: {cousre.duration}</p>
				<p>Created: {cousre.creationDate}</p>
				<p>Authors: {authorsNames.join(', ')}</p>
			</div>
		</div>
	);
}
