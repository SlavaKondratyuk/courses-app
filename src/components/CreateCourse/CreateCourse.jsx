import React from 'react';

import Button from '../common/Button/Button';

import './CreateCourse.css';

class CreateCourse extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			description: '',
			duration: '',
			authors: [],
		};
	}

	clickHandler = () => {
		this.props.clickHandler();
	};

	render() {
		const { name } = this.props;
		return (
			<div className='create-course_wrapper'>
				<p>{name}</p>
				<Button name='Back to Courses' clickHandler={this.clickHandler} />
			</div>
		);
	}
}

export default CreateCourse;
