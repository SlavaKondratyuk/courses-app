import { useNavigate } from 'react-router-dom';

import Button from '../../../common/Button/Button';
import minutesToHours from '../../../helpers/pipeDuration';

import { Author, CourseInterface } from '../../../interfaces/interfaces';

import { DeleteCourseService } from '../../../../services';

import { deleteCourse } from '../../../../store/courses/actionCreators';

import './CourseCard.css';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

interface CourseCardProps extends CourseInterface {
	mockedAuthors: Author[] | null;
}

function CourseCard(props: CourseCardProps) {
	const { title, description, duration, creationDate, id } = props;
	const role = useAppSelector((state) => state.user.role);
	const dispatch = useAppDispatch();
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

	function deleteCourseFromServer(): void {
		DeleteCourseService(id).then((res) => {
			if (res.successful) {
				dispatch(deleteCourse(id));
				alert('Course deleted');
			}
		});
	}

	function editCourse(): void {
		navigate('/courses/update/' + id);
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
					{role === 'admin' ? (
						<div>
							<Button
								name='Delte Course'
								clickHandler={deleteCourseFromServer}
							/>
							<Button
								className='className'
								name='Edit Course'
								clickHandler={editCourse}
							/>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default CourseCard;
