import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Input from '../common/Input/Input';

import './Registration.css';

export default function Registration() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const navigate = useNavigate();

	async function onRegister(e: React.FormEvent<HTMLFormElement>) {
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

		await axios({
			method: 'post',
			url: 'http://localhost:4000/register',
			data: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				if (res.data.successful) {
					navigate('/login');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div className='registration-wrapper'>
			<h1>Registration</h1>
			<form action='' onSubmit={onRegister}>
				<label htmlFor='name'>Name</label>
				<Input type='text' name='name' valueChangeHandler={setName} />
				<label htmlFor='email'>Email</label>
				<Input type='email' name='email' valueChangeHandler={setEmail} />
				<label htmlFor='password'>Password</label>
				<Input
					type='password'
					name='password'
					valueChangeHandler={setPassword}
				/>
				<label htmlFor='confirmPassword'>Confirm Password</label>
				<Input
					type='password'
					name='confirmPassword'
					valueChangeHandler={setConfirmPassword}
				/>
				<input className='btn-register' type='submit' value='Registration' />
				<p>
					If you have an accaunt you can{' '}
					<Link rel='stylesheet' to='/login'>
						Login
					</Link>
				</p>
			</form>
		</div>
	);
}
