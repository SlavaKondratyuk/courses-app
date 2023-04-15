import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Author, CourseInterface } from '../interfaces/interfaces';

import './CourseInfo.css';
import { useAppSelector } from '../../store/hooks';

export default function CourseInfo() {
	const { courseId } = useParams();
	const fetchedCourse = useAppSelector<CourseInterface | undefined>((state) =>
		state.courses.courses.find((course) => course.id === courseId)
	);
	let fetchedAuthors = useAppSelector<Author[]>(
		(state) => state.authors.authors
	);

	const authors: Author[] | undefined = fetchedAuthors.filter((author) =>
		fetchedCourse?.authors.includes(author.id)
	);
	const authorsNames = authors.map((author) => author.name);

	return (
		<div className='course-info-wrapper'>
			<Link className='step-back-Link' rel='stylesheet' to='/courses'>
				{'<'} Back To Courses
			</Link>
			<h1>{fetchedCourse?.title}</h1>
			<div className='info-div'>
				<div className='info-description'>
					<p>{fetchedCourse?.description}</p>
				</div>
				<div className='info-filteredCourse'>
					<p>
						<span>ID:</span> {fetchedCourse?.id}
					</p>
					<p>
						<span>Duration:</span> {fetchedCourse?.duration}
					</p>
					<p>
						<span>Created:</span> {fetchedCourse?.creationDate}
					</p>
					<p>
						<span>Authors:</span> {authorsNames.join(', ')}
					</p>
				</div>
			</div>
		</div>
	);
}
