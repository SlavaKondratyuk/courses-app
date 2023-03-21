import { React, useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../common/Input/Input';

import './Login.css';

export default function Login() {
	const [email, setEmail] = useState('hello');
	const [password, setPassword] = useState('');

	function onRegister(e) {
		e.preventDefault();
		console.log(email);
	}

	return (
		<div className='login-wrapper'>
			<h1>Login</h1>
			<form action='' onSubmit={onRegister}>
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
				<input type='submit' value='Submit' />
				<p>
					Don't have an account?{' '}
					<Link rel='stylesheet' to='/registration'>
						Register
					</Link>
				</p>
			</form>
		</div>
	);
}
