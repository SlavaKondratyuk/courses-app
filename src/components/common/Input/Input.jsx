import React from 'react';

import './Input.css';

class Input extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
		};

		this.changeHandler = this.changeHandler.bind(this);
	}

	changeHandler = (event) => {
		this.setState({ value: event.target.value });
		this.props.valueChangeHandler(event);
	};

	render() {
		const { name } = this.props;
		const { value } = this.state;
		return (
			<div>
				<input
					className='form-control'
					name={name}
					id={name}
					value={value}
					placeholder='Enter search text'
					onChange={this.changeHandler}
				/>
			</div>
		);
	}
}

export default Input;
