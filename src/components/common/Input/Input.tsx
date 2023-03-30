import { useState } from 'react';

import './Input.css';

type InputProps = {
	name: string;
	valueChangeHandler: Function;
	type?: string;
	placeholder?: string;
};

export default function Input(props: InputProps) {
	const [inputvalue, setInputvalue] = useState('');

	function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		setInputvalue(event.target.value);
		props.valueChangeHandler(event.target.value);
	}
	return (
		<div>
			<input
				className='form-control'
				name={props.name}
				value={inputvalue}
				type={props.type || 'text'}
				placeholder={props.placeholder || ''}
				onChange={changeHandler}
			/>
		</div>
	);
}
