import React from 'react';

import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';

import './SearchBar.css';

export default class SearchBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchQuery: '',
		};

		this.searchHandler = this.searchHandler.bind(this);
		this.fileterCourses = this.fileterCourses.bind(this);
	}

	searchHandler = (value) => {
		this.setState({ searchQuery: value });

		if (!value) {
			this.props.updateCoursesList(value);
		}
	};

	fileterCourses = () => {
		console.log(this.state.searchQuery + ' this is from filterCourses');
	};

	filterById = (searchQuery) => {
		if (!searchQuery) {
			return;
		}
		const courses = this.props.courses;
		const filteredCourses = courses.filter((course) =>
			course.id.toLowerCase().includes(searchQuery.toLowerCase())
		);

		return filteredCourses;
	};

	filterByName = (searchQuery) => {
		if (!searchQuery) {
			return;
		}

		const courses = this.props.courses;
		const filteredCourses = courses.filter((course) =>
			course.title.toLowerCase().includes(searchQuery.toLowerCase())
		);

		return filteredCourses;
	};

	excludeCoursesDuplicates = (filteredByName, filterById) => {
		const filteredCourses = [...filteredByName, ...filterById];
		const excludeDuplicates = filteredCourses.filter(
			(course, index, self) =>
				index === self.findIndex((t) => t.id === course.id)
		);

		this.props.updateCoursesList(excludeDuplicates);
	};

	render() {
		return (
			<div className='search-bar'>
				<Input valueChangeHandler={this.searchHandler} />
				<Button
					name='Search'
					clickHandler={() =>
						this.excludeCoursesDuplicates(
							this.filterByName(this.state.searchQuery),
							this.filterById(this.state.searchQuery)
						)
					}
				/>
			</div>
		);
	}
}
