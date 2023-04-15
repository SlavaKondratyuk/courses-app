import { useEffect, useState } from 'react';

import './Input.css';

type InputProps = {
	name: string;
	valueChangeHandler: Function;
	type?: string;
	placeholder?: string;
	value?: string;
};

export default function Input(props: InputProps) {
	const { value } = props;
	const [inputValue, setInputvalue] = useState('');

	useEffect(() => {
		value ? setInputvalue(value) : setInputvalue('');
	}, [value]);

	function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		setInputvalue(event.target.value);
		props.valueChangeHandler(event.target.value);
	}
	return (
		<div>
			<input
				className='form-control'
				name={props.name}
				value={inputValue}
				type={props.type || 'text'}
				placeholder={props.placeholder || ''}
				onChange={changeHandler}
			/>
		</div>
	);
}
