import React from 'react';

import Button from '../../../../common/Button/Button';

export default function CourseAuthors(props) {
	const { authors } = props;
	function deleteAuthor(id) {
		props.deleteAuthor(id);
	}

	if (authors.length === 0) {
		return <p>Course authors is empty</p>;
	}

	return (
		<div>
			<ul>
				{props.authors.map((author) => (
					<li key={author.id}>
						{author.name}{' '}
						<Button
							name='Delete Author'
							clickHandler={() => deleteAuthor(author.id)}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
