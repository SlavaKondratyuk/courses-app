import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Input from '../common/Input/Input';

import '../common/Input/Input';

import './Login.css';

export default function Login() {
	const [email, setEmail] = useState('hello');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	async function onLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const usVer = {
			email,
			password,
		};

		await axios({
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
				<Input type='email' name='email' valueChangeHandler={setEmail} />
				<label htmlFor='password'>Password</label>
				<Input
					type='password'
					name='password'
					valueChangeHandler={setPassword}
				/>
				<input className='btn-submit' type='submit' value='Submit' />
				<p className='p-registration'>
					If you not have accaunt you can{' '}
					<Link rel='stylesheet' to='/registration'>
						Registration
					</Link>
				</p>
			</form>
		</div>
	);
}
