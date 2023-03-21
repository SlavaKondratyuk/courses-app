import React from 'react';

import Button from '../../../common/Button/Button';

import './CourseCard.css';

class CourseCard extends React.Component {
	constructor(props) {
		super(props);

		this.mockedAuthors = this.props.mockedAuthors;

		this.minutesToHours = this.minutesToHours.bind(this);
		this.findAuthors = this.findAuthors.bind(this);
	}

	minutesToHours = (minutes) => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${hours < 10 ? '0' + hours : hours}h ${
			mins < 10 ? '0' + mins : mins
		}m`;
	};

	findAuthors = () => {
		const authors = this.props.authors;
		const mockedAuthors = this.mockedAuthors;

		const authorsNames = mockedAuthors.reduce((acc, author) => {
			if (authors.includes(author.id)) {
				acc.push(author.name);
			}
			return acc;
		}, []);

		return authorsNames.join(', ');
	};

	render() {
		const { title, description, duration, created, deleteHandler } = this.props;
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
						{this.findAuthors().length > 30
							? this.findAuthors().substring(0, 30 - 3) + '...'
							: this.findAuthors()}
					</div>
					<div className='course-card__duration'>
						<span className='bold'>Duration: </span>
						{this.minutesToHours(duration)}
					</div>
					<div className='course-card__duration'>
						<span className='bold'>Created: </span>
						{created}
					</div>
					<Button name='Show Course' clickHandler={deleteHandler} />
				</div>
			</div>
		);
	}
}

export default CourseCard;
