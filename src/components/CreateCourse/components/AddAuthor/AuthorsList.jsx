import React from 'react';

import Button from '../../../common/Button/Button';

import './AuthorsList.css';

export default function AuthorsList(props) {
	function addAuthor(author) {
		props.addAuthor(author);
	}

	return (
		<div className='authors-list__wrapper'>
			<h2>Authors List</h2>
			{props.authors.map((author) => (
				<div key={author.id} className='author__wrapper'>
					<p>{author.name}</p>
					<Button
						className='add-author__btn'
						name='Add Author'
						clickHandler={() => addAuthor(author)}
					/>
				</div>
			))}
		</div>
	);
}
