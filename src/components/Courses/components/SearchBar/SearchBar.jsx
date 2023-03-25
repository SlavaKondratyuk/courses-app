import { React, useState } from 'react';

import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';

import './SearchBar.css';

export default function SearchBar(props) {
	const [searchQuery, setSearchQuery] = useState('');

	function searchHandler(value) {
		setSearchQuery(value);

		if (!value) {
			props.updateCoursesList(value);
		}
	}

	function filterById(searchQuery) {
		if (!searchQuery) {
			return;
		}
		const courses = props.courses;
		const filteredCourses = courses.filter((course) =>
			course.id.toLowerCase().includes(searchQuery.toLowerCase())
		);

		return filteredCourses;
	}

	function filterByName(searchQuery) {
		if (!searchQuery) {
			return;
		}

		const courses = props.courses;
		const filteredCourses = courses.filter((course) =>
			course.title.toLowerCase().includes(searchQuery.toLowerCase())
		);

		return filteredCourses;
	}

	function excludeCoursesDuplicates(filteredByName, filterById) {
		if (!searchQuery) return;

		const byName = filteredByName ? filteredByName : [];
		const byId = filterById ? filterById : [];
		const filteredCourses = [...byName, ...byId];
		const excludeDuplicates = filteredCourses.filter(
			(course, index, self) =>
				index === self.findIndex((t) => t.id === course.id)
		);

		props.updateCoursesList(excludeDuplicates);
	}

	return (
		<div className='search-bar'>
			<Input valueChangeHandler={searchHandler} />
			<Button
				name='Search'
				clickHandler={() =>
					excludeCoursesDuplicates(
						filterByName(searchQuery),
						filterById(searchQuery)
					)
				}
			/>
		</div>
	);
}
