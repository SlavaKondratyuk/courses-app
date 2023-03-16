import React from 'react';

import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';

import './SearchBar.css';

export default class SearchBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			search: '',
		};

		this.searchHandler = this.searchHandler.bind(this);
	}

	searchHandler = (event) => {
		console.log(event.target.value);
		this.setState({ search: event.target.value });
	};

	render() {
		const { search } = this.state;
		return (
			<div className='search-bar'>
				<Input name={search} onChange={this.searchHandler} />
				<Button name='Search' clickHandler={() => console.log('Search')} />
			</div>
		);
	}
}
