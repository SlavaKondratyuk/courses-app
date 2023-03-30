import React, { useState } from 'react';

import './Input.css';

export default function Input(props) {
	const [inputvalue, setInputvalue] = useState('');

	function changeHandler(event) {
		setInputvalue(event.target.value);
		props.valueChangeHandler(event.target.value);
	}

	const { name } = props;
	return (
		<div>
			<input
				className='form-control'
				name={name}
				id={name}
				value={inputvalue}
				placeholder='Enter text'
				onChange={changeHandler}
			/>
		</div>
	);
}
