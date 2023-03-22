import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Input from '../common/Input/Input';

import './Registration.css';

export default function Registration() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	let result = '';

	async function onRegister(e) {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
		const newUser = {
			name,
			email,
			password,
		};

		const response = await axios({
			method: 'post',
			url: 'http://localhost:4000/register',
			data: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				console.log(res.data.successful);
			})
			.catch((err) => {
				console.log(err);
			});
		// result = await response.json();
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
