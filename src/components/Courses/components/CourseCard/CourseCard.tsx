import { useNavigate } from 'react-router-dom';

import Button from '../../../common/Button/Button';
import minutesToHours from '../../../helpers/pipeDuration';

import { Author, CourseInterface } from '../../../interfaces/interfaces';

import './CourseCard.css';

interface CourseCardProps extends CourseInterface {
	mockedAuthors: Author[] | null;
}

function CourseCard(props: CourseCardProps) {
	const { title, description, duration, creationDate, id } = props;
	let navigate = useNavigate();

	function findAuthors(): string {
		const authors: string[] = props.authors;
		const mockedAuthors: Author[] | null = props.mockedAuthors;

		const authorsNames: string[] | undefined = mockedAuthors?.reduce(
			(acc: string[], author: Author) => {
				if (authors?.includes(author.id)) {
					acc.push(author.name);
				}
				return acc;
			},
			[]
		);

		return authorsNames?.join(', ') ? authorsNames.join(', ') : '';
	}

	function nav(): void {
		navigate(id);
	}

	function deleteCourse(): void {
		console.log('course deleted:' + ' ' + id);
		// dispatch(deleteCourse(props.id));
	}

	function editCourse(): void {
		navigate('/courses/update/' + id);
		// dispatch(deleteCourse(props.id));
	}

	return (
		<div className='course-card'>
			<div className='card-item__description'>
				<div className='course-card__title'>{title}</div>
				<div className='course-card__description'>
					<p>{description}</p>
				</div>
			</div>
			<div className='card-item__data'>
				<div className='course-card__authors'>
					<span className='bold'>Authors: </span>
					{findAuthors().length > 30
						? findAuthors().substring(0, 30 - 3) + '...'
						: findAuthors()}
				</div>
				<div className='course-card__duration'>
					<span className='bold'>Duration: </span>
					{minutesToHours(duration)}
				</div>
				<div className='course-card__duration'>
					<span className='bold'>Created: </span>
					{creationDate}
				</div>
				<div className='btn-course'>
					<Button name='Show Course' clickHandler={nav} />
					<Button name='Delte Course' clickHandler={deleteCourse} />
					<Button
						className='className'
						name='Edit Course'
						clickHandler={editCourse}
					/>
				</div>
			</div>
		</div>
	);
}

export default CourseCard;
