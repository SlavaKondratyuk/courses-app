import { React, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import AuthorsList from './components/AddAuthor/AuthorsList';
import CourseAuthors from './components/AddAuthor/CourseAuthors/CourseAuthors';

import './CreateCourse.css';

export default function CreateCourse(props) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState('');
	const [courseAuthors, setCourseAuthors] = useState([]);
	const [author, setAuthor] = useState('');
	const [allAuthors, setAllAuthors] = useState(props.courseAuthors);

	function allDataFilled() {
		return title && description && duration && courseAuthors.length > 0;
	}

	function getNewCourseData() {
		const newCourse = {
			id: uuidv4(),
			title,
			description,
			duration,
			creationDate: new Date().toLocaleDateString(),
			authors: courseAuthors.map((author) => author.id),
		};
		return newCourse;
	}

	function createCourse() {
		if (!allDataFilled()) {
			alert('Please fill all fields');
			return;
		}

		props.createCourse(getNewCourseData());
		props.clickHandler();
	}

	function titleHandler(value) {
		setTitle(value);
	}

	function descriptionHandler(event) {
		setDescription(event.target.value);
	}

	function authorHandler(value) {
		setAuthor(value);
	}

	function durationHandler(value) {
		setDuration(value);
	}

	function minutesToHours(minutes) {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${hours < 10 ? '0' + hours : hours}:${
			mins < 10 ? '0' + mins : mins
		}`;
	}

	function generateAuthor() {
		const newAuthor = {
			id: uuidv4(),
			name: author,
		};
		return newAuthor;
	}

	function updateAuthors() {
		if (author === '') return;
		const newAuthorList = [...allAuthors, generateAuthor()];

		props.updateAuthors(newAuthorList);
		setAllAuthors(newAuthorList);
	}

	function deleteAuthorfromCourse(id) {
		const updatedAuthors = courseAuthors.filter((author) => author.id !== id);
		setCourseAuthors(updatedAuthors);

		const returnAuthor = courseAuthors.find((author) => author.id === id);
		setAllAuthors([...allAuthors, returnAuthor]);
	}

	function addAuthorToCourse(author) {
		setCourseAuthors([...courseAuthors, author]);
		deleteAuthorfromAuthorsList(author.id);
	}

	function deleteAuthorfromAuthorsList(id) {
		const updatedAuthors = allAuthors.filter((author) => author.id !== id);
		setAllAuthors(updatedAuthors);
	}

	return (
		<div className='create-course__wrapper'>
			<div className='header__wrapper'>
				<div className='title__wrapper'>
					<label htmlFor='title'>Title</label>
					<Input
						name='title'
						value={title}
						placeholder='Enter course title'
						valueChangeHandler={titleHandler}
					/>
				</div>
				<Button name='Create Course' clickHandler={createCourse} />
			</div>
			<div className='description__wrapper'>
				<label htmlFor='description'>Description</label>
				<textarea
					name='description'
					id='description'
					value={description}
					placeholder='Enter course description'
					onChange={descriptionHandler}
				/>
			</div>
			<div className='course-data__wrapper'>
				<div className='add-course__tile'>
					<h3>Add Author</h3>
					<div className='add-author__wrapper'>
						<label htmlFor='author'>Author Name:</label>
						<Input
							name='author'
							value={author}
							valueChangeHandler={authorHandler}
						/>
						<Button name='Create Author' clickHandler={updateAuthors} />
					</div>
				</div>
				<div className='add-course__tile'>
					<AuthorsList authors={allAuthors} addAuthor={addAuthorToCourse} />
				</div>
				<div className='add-course__tile'>
					<h2>Duration</h2>
					<div className='course-duration__wrapper'>
						<label htmlFor='hours'>Minutes</label>
						<Input
							name='hours'
							value={duration}
							valueChangeHandler={durationHandler}
						/>
					</div>
					<p className='durationHopurs'>
						Duration: <span>{minutesToHours(duration)}</span> hours
					</p>
				</div>
				<div className='add-course__tile'>
					<h2>Course Authors</h2>
					<CourseAuthors
						authors={courseAuthors}
						deleteAuthor={deleteAuthorfromCourse}
					/>
				</div>
			</div>
		</div>
	);
}
