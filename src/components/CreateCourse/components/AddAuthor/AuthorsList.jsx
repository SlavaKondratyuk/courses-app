import React from 'react';

import Button from '../../../common/Button/Button';

import './AuthorsList.css';

class AuthorsList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			authorsList: [],
		};

		this.unpdateStateAuthors = this.unpdateStateAuthors.bind(this);
	}

	componentDidMount() {
		this.unpdateStateAuthors();
	}

	unpdateStateAuthors = () => {
		this.setState({ authorsList: this.props.authors });
	};

	render() {
		const { authors } = this.props;
		return (
			<div className='authors-list__wrapper'>
				<h2>Authors List</h2>
				{authors.map((author) => (
					<div key={author.id} className='author__wrapper'>
						<p>{author.name}</p>
						<Button className='add-author__btn' name='Add Author' />
					</div>
				))}
			</div>
		);
	}
}

export default AuthorsList;
