import { useState } from 'react';

import { CourseInterface } from '../../../interfaces/interfaces';

import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';

import './SearchBar.css';

type SearchBarProps = {
	courses: CourseInterface[];
	updateCoursesList: Function;
};

export default function SearchBar(props: SearchBarProps) {
	const [searchQuery, setSearchQuery] = useState<string>('');

	function searchHandler(value: string): void {
		setSearchQuery(value);

		if (!value) {
			props.updateCoursesList(value);
		}
	}

	function filterById(searchQuery: string): CourseInterface[] | [] | undefined {
		if (!searchQuery) {
			return;
		}
		const courses = props.courses;
		const filteredCourses = courses.filter((course) =>
			course.id.toLowerCase().includes(searchQuery.toLowerCase())
		);

		return filteredCourses;
	}

	function filterByName(
		searchQuery: string
	): CourseInterface[] | [] | undefined {
		if (!searchQuery) {
			return;
		}

		const courses = props.courses;
		const filteredCourses = courses.filter((course) =>
			course.title.toLowerCase().includes(searchQuery.toLowerCase())
		);

		return filteredCourses;
	}

	function excludeCoursesDuplicates(
		filteredByName: CourseInterface[] | [] | undefined,
		filterById: CourseInterface[] | [] | undefined
	): void {
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
			<Input name='Search Bar' valueChangeHandler={searchHandler} />
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
