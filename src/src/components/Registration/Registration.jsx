import { React, useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../common/Input/Input';

import './Registration.css';

export default function Registration() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	function onRegister(e) {
		e.preventDefault();
		console.log(name, email, password, confirmPassword);
	}

	return (
		<div className='registration-wrapper'>
			<h1>Registration</h1>
			<form action='' onSubmit={onRegister}>
				<label htmlFor='name'>Name</label>
				<Input type='text' name='name' id='name' valueChangeHandler={setName} />
				<label htmlFor='email'>Email</label>
				<Input
					type='email'
					name='email'
					id='email'
					valueChangeHandler={setEmail}
				/>
				<label htmlFor='password'>Password</label>
				<Input
					type='password'
					name='password'
					id='password'
					valueChangeHandler={setPassword}
				/>
				<label htmlFor='confirmPassword'>Confirm Password</label>
				<Input
					type='password'
					name='confirmPassword'
					id='confirmPassword'
					valueChangeHandler={setConfirmPassword}
				/>
				<input type='submit' value='Register' />
				<p>
					Already have an account?{' '}
					<Link rel='stylesheet' to='/login'>
						Login
					</Link>
				</p>
			</form>
		</div>
	);
}
