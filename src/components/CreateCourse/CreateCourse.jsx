import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import AuthorsList from './components/AddAuthor/AuthorsList';

import './CreateCourse.css';

class CreateCourse extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			description: '',
			duration: '',
			authors: [],
			courseAuthors: [],
			author: '',
		};

		this.createCourseStateHandler = this.createCourseStateHandler.bind(this);
		this.titleHandler = this.titleHandler.bind(this);
		this.descriptionHandler = this.descriptionHandler.bind(this);
		this.authorHandler = this.authorHandler.bind(this);
		this.addAuthor = this.addAuthor.bind(this);
		this.durationHandler = this.durationHandler.bind(this);
	}

	componentDidMount() {
		this.unpdateStateAuthors();
	}

	unpdateStateAuthors = () => {
		this.setState({ authors: this.props.courseAuthors }, () => {
			console.log(this.state.authors, 'authors');
		});
	};

	createCourseStateHandler = () => {
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

	addAuthor = () => {
		const authors = this.state.authors;
		authors.push(this.state.author);
		this.setState({ authors });
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

	render() {
		const { name } = this.props;
		const { authors } = this.state;
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
					<Button
						name='Back to Courses'
						clickHandler={this.createCourseStateHandler}
					/>
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
							<Button name='Create Author' clickHandler={this.addAuthor} />
						</div>
					</div>
					<div className='add-course__tile'>
						<AuthorsList authors={this.state.authors} />
					</div>
					<div className='add-course__tile'>
						<h2>Duration</h2>
						<div className='course-duration__wrapper'>
							<label htmlFor='hours'>Hours</label>
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
						{this.state.courseAuthors.map((author) => (
							<div key={author.id} className='course-author__wrapper'>
								<p>{author.name}</p>
								<Button className='add-author__btn' name='Delete Author' />
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default CreateCourse;
