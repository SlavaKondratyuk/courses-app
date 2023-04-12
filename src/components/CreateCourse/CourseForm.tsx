import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import { Author, NewCourseInterface } from '../interfaces/interfaces';

import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import AuthorsList from './components/AddAuthor/AuthorsList';
import CourseAuthors from './components/AddAuthor/CourseAuthors/CourseAuthors';

import MinutesToHours from '../helpers/pipeDuration';
import DateGenerator from '../helpers/dateGenerator.js';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addNewCourse } from '../../store/courses/actionCreators';
import { addNewAuthor } from '../../store/authors/actionCreators';

import { AddNewCourse, AddNewAuthor } from '../../services';

import './CourseForm.css';

export default function CreateCourse() {
	const dispatch = useAppDispatch();
	let fetchedAuthors = useAppSelector<Author[]>(
		(state) => state.authors.authors
	);
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [duration, setDuration] = useState<number>(0);
	const [courseAuthors, setCourseAuthors] = useState<Author[] | []>([]);
	const [author, setAuthor] = useState<string>('');
	const [allAuthors, setAllAuthors] = useState<Author[] | []>([]);
	const navigate = useNavigate();

	useEffect(() => {
		setAllAuthors(fetchedAuthors);
	}, [dispatch, fetchedAuthors]);

	function allDataFilled(): boolean {
		return !!title && !!description && !!duration && courseAuthors.length > 0;
	}

	function getNewCourseData(): NewCourseInterface {
		const newCourse = {
			title,
			description,
			duration,
			authors: courseAuthors.map((author) => author.id),
		};
		return newCourse;
	}

	const dispatchNewCourse = useCallback(
		async (course: NewCourseInterface): Promise<void> => {
			const response = await AddNewCourse(course);
			if (response.data.successful) {
				dispatch(addNewCourse(course));
				navigate('/courses');
			} else {
				alert('Something went wrong');
			}
		},
		[dispatch]
	);

	function createCourse(): void {
		if (!allDataFilled()) {
			alert('Please fill all fields');
			return;
		}

		dispatchNewCourse(getNewCourseData());
	}

	function descriptionHandler(
		event: React.ChangeEvent<HTMLTextAreaElement>
	): void {
		setDescription(event.target.value);
	}

	function titleHandler(value: string): void {
		setTitle(value);
	}

	function authorHandler(value: string): void {
		setAuthor(value);
	}

	function durationHandler(value: string): void {
		setDuration(Number(value));
	}

	function generateAuthor(): Author {
		const newAuthor = {
			id: uuidv4(),
			name: author,
		};
		return newAuthor;
	}

	const dispatchNewAuthor = useCallback(
		async (author: Author): Promise<void> => {
			const response = await AddNewAuthor(author);
			if (response.data.successful) {
				dispatch(addNewAuthor(author));
			} else {
				alert('Something went wrong');
			}
		},
		[dispatch]
	);

	function createNewAuthor(): void {
		if (author === '') {
			alert('Please fill all fields');
			return;
		}
		const newAuthor = generateAuthor();
		dispatchNewAuthor(newAuthor);
		setAuthor('');
	}

	function deleteAuthorfromCourse(id: string): void {
		const updatedAuthors = courseAuthors.filter((author) => author.id !== id);
		setCourseAuthors(updatedAuthors);

		const returnAuthor = courseAuthors.find((author) => author.id === id);
		setAllAuthors([...allAuthors, returnAuthor as Author]);
	}

	function addAuthorToCourse(author: Author): void {
		setCourseAuthors([...courseAuthors, author]);
		deleteAuthorfromAuthorsList(author.id);
	}

	function deleteAuthorfromAuthorsList(id: string): void {
		const updatedAuthors = allAuthors.filter(
			(author: Author) => author.id !== id
		);
		setAllAuthors(updatedAuthors);
	}

	return (
		<div className='create-course__wrapper'>
			<div className='header__wrapper'>
				<div className='title__wrapper'>
					<label htmlFor='title'>Title</label>
					<Input
						name='title'
						placeholder='Enter course title'
						valueChangeHandler={titleHandler}
					/>
				</div>
				<Button name='Create Course' clickHandler={createCourse} />
			</div>
			<div className='description__wrapper'>
				<label className='description' htmlFor='description'>
					Description
				</label>
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
					<h2>Add Author</h2>
					<div className='add-author__wrapper'>
						<label htmlFor='author'>Author Name:</label>
						<Input name='author' valueChangeHandler={authorHandler} />
						<div className='btn-create-author'>
							<Button name='Create Author' clickHandler={createNewAuthor} />
						</div>
					</div>
				</div>
				<div className='add-course__tile'>
					<AuthorsList authors={allAuthors} addAuthor={addAuthorToCourse} />
				</div>
				<div className='add-course__tile'>
					<h2>Duration</h2>
					<div className='course-duration__wrapper'>
						<label htmlFor='hours'>Minutes</label>
						<Input name='hours' valueChangeHandler={durationHandler} />
					</div>
					<p className='durationHopurs'>
						Duration: <span>{MinutesToHours(duration)}</span> hours
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
