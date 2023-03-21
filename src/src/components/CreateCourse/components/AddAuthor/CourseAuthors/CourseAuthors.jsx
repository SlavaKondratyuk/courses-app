import React from 'react';

import Button from '../../../../common/Button/Button';

class CourseAuthors extends React.Component {
	constructor(props) {
		super(props);

		this.deleteAuthor = this.deleteAuthor.bind(this);
	}

	deleteAuthor = (id) => {
		this.props.deleteAuthor(id);
	};

	render() {
		const { authors } = this.props;

		if (authors.length === 0) {
			return <p>Course authors is empty</p>;
		}

		return (
			<div>
				<ul>
					{this.props.authors.map((author) => (
						<li key={author.id}>
							{author.name}{' '}
							<Button
								name='Delete Author'
								clickHandler={() => this.deleteAuthor(author.id)}
							/>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default CourseAuthors;
