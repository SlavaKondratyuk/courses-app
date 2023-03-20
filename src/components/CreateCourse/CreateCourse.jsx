import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import AuthorsList from './components/AddAuthor/AuthorsList';
import CourseAuthors from './components/AddAuthor/CourseAuthors/CourseAuthors';

import './CreateCourse.css';

class CreateCourse extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			description: '',
			duration: '',
			courseAuthors: [],
			author: '',
		};

		this.createCourse = this.createCourse.bind(this);
		this.titleHandler = this.titleHandler.bind(this);
		this.descriptionHandler = this.descriptionHandler.bind(this);
		this.authorHandler = this.authorHandler.bind(this);
		this.durationHandler = this.durationHandler.bind(this);
		this.minutesToHours = this.minutesToHours.bind(this);
		this.generateAuthor = this.generateAuthor.bind(this);
		// this.updateStateAuthors = this.updateStateAuthors.bind(this);
		this.updateAuthors = this.updateAuthors.bind(this);
		this.deleteAuthorfromCourse = this.deleteAuthorfromCourse.bind(this);
		this.addAuthorToCourse = this.addAuthorToCourse.bind(this);
		this.allDataFilled = this.allDataFilled.bind(this);
		this.getNewCourseData = this.getNewCourseData.bind(this);
		this.createCourse = this.createCourse.bind(this);
	}

	allDataFilled = () => {
		const { title, description, duration, courseAuthors } = this.state;
		return title && description && duration && courseAuthors.length > 0;
	};

	getNewCourseData = () => {
		const { title, description, duration, courseAuthors } = this.state;
		const newCourse = {
			id: uuidv4(),
			title,
			description,
			duration: duration,
			authors: courseAuthors,
		};
		return newCourse;
	};

	createCourse = () => {
		if (!this.allDataFilled()) {
			alert('Please fill all fields');
			return;
		}

		this.props.createCourse(this.getNewCourseData());
		this.props.clickHandler();
	};

	titleHandler = (event) => {
		this.setState({ title: event.target.value });
	};

	descriptionHandler = (event) => {
		this.setState({ description: event.target.value });
	};

	authorHandler = (event) => {
		this.setState({ author: event.target.value });
	};

	durationHandler = (event) => {
		this.setState({ duration: event.target.value });
	};

	minutesToHours = (minutes) => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${hours < 10 ? '0' + hours : hours}:${
			mins < 10 ? '0' + mins : mins
		}`;
	};

	generateAuthor = () => {
		const author = {
			id: uuidv4(),
			name: this.state.author,
		};
		return author;
	};

	updateAuthors = () => {
		if (this.state.author === '') return;

		this.props.updateAuthors([
			...this.props.courseAuthors,
			this.generateAuthor(),
		]);
	};

	deleteAuthorfromCourse = (id) => {
		const updatedAuthors = this.state.courseAuthors.filter(
			(author) => author.id !== id
		);
		this.setState({ courseAuthors: updatedAuthors });
	};

	addAuthorToCourse = (author) => {
		this.setState({ courseAuthors: [...this.state.courseAuthors, author] });
	};

	render() {
		return (
			<div className='create-course__wrapper'>
				<div className='header__wrapper'>
					<div className='title__wrapper'>
						<label htmlFor='title'>Title</label>
						<Input
							name='title'
							value={this.state.title}
							placeholder='Enter course title'
							valueChangeHandler={this.titleHandler}
						/>
					</div>
					<Button name='Create Course' clickHandler={this.createCourse} />
				</div>
				<div className='description__wrapper'>
					<label htmlFor='description'>Description</label>
					<textarea
						name='description'
						id='description'
						value={this.state.description}
						placeholder='Enter course description'
						onChange={this.descriptionHandler}
					/>
				</div>
				<div className='course-data__wrapper'>
					<div className='add-course__tile'>
						<h3>Add Author</h3>
						<div className='add-author__wrapper'>
							<label htmlFor='author'>Author Name:</label>
							<Input
								name='author'
								value={this.state.author}
								valueChangeHandler={this.authorHandler}
							/>
							<Button name='Create Author' clickHandler={this.updateAuthors} />
						</div>
					</div>
					<div className='add-course__tile'>
						<AuthorsList
							authors={this.props.courseAuthors}
							addAuthor={this.addAuthorToCourse}
						/>
					</div>
					<div className='add-course__tile'>
						<h2>Duration</h2>
						<div className='course-duration__wrapper'>
							<label htmlFor='hours'>Minutes</label>
							<Input
								name='hours'
								value={this.state.duration}
								valueChangeHandler={this.durationHandler}
							/>
						</div>
						<p className='durationHopurs'>
							Duration: <span>{this.minutesToHours(this.state.duration)}</span>{' '}
							hours
						</p>
					</div>
					<div className='add-course__tile'>
						<h2>Course Authors</h2>
						<CourseAuthors
							authors={this.state.courseAuthors}
							deleteAuthor={this.deleteAuthorfromCourse}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default CreateCourse;
