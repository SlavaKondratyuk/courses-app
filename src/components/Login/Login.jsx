import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Input from '../common/Input/Input';

import './Login.css';

export default function Login(props) {
	const [email, setEmail] = useState('hello');
	const [password, setPassword] = useState('');
	const userName = props.userName;
	const navigate = useNavigate();

	async function onLogin(e) {
		e.preventDefault();

		const usVer = {
			email,
			password,
		};

		const response = await axios({
			method: 'post',
			url: 'http://localhost:4000/login',
			data: JSON.stringify(usVer),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				console.log(res.data.successful);
				localStorage.setItem('name', JSON.stringify(res.data.user.name));
				localStorage.setItem('loginToken', JSON.stringify(res.data.result));
				console.log(userName);
				navigate('/courses');
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div className='login-wrapper'>
			<h1>Login</h1>
			<form action='' onSubmit={onLogin}>
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
