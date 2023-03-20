import React from 'react';

import Button from '../../../common/Button/Button';

import './AuthorsList.css';

class AuthorsList extends React.Component {
	addAuthor = (author) => {
		this.props.addAuthor(author);
	};

	render() {
		const { authors } = this.props;
		return (
			<div className='authors-list__wrapper'>
				<h2>Authors List</h2>
				{authors.map((author) => (
					<div key={author.id} className='author__wrapper'>
						<p>{author.name}</p>
						<Button
							className='add-author__btn'
							name='Add Author'
							clickHandler={() => this.addAuthor(author)}
						/>
					</div>
				))}
			</div>
		);
	}
}

export default AuthorsList;
