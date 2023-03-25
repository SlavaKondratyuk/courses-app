import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../common/Button/Button';

import './CourseCard.css';

export default function CourseCard(props) {
	const { title, description, duration, created } = props;
	let navigate = useNavigate();

	function minutesToHours(minutes) {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${hours < 10 ? '0' + hours : hours}h ${
			mins < 10 ? '0' + mins : mins
		}m`;
	}

	function findAuthors() {
		const authors = props.authors;
		const mockedAuthors = props.mockedAuthors;

		const authorsNames = mockedAuthors.reduce((acc, author) => {
			if (authors.includes(author.id)) {
				acc.push(author.name);
			}
			return acc;
		}, []);

		return authorsNames.join(', ');
	}

	function nav() {
		navigate(props.id);
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
					{created}
				</div>
				<Button name='Show Course' clickHandler={nav} />
			</div>
		</div>
	);
}
