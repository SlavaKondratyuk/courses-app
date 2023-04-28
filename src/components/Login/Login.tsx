import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../store/hooks';
import { userUpdate } from '../../store/user/actionCreators';

import Input from '../common/Input/Input';

import { LoginUser, CheckMe } from '../../services';

import './Login.css';

export default function Login() {
	const [email, setEmail] = useState('hello');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const isAuth = localStorage.getItem('isAuth');
		if (isAuth) {
			navigate('/courses');
		}
	}, [navigate]);

	async function onLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const usVer = {
			email,
			password,
		};

		// const result: any;

		await LoginUser(usVer)
			.then((res) => {
				console.log(res);
				localStorage.setItem('name', res.user.name);
				localStorage.setItem('loginToken', res.result);
				localStorage.setItem('isAuth', JSON.stringify(true));
				localStorage.setItem('email', res.user.email);
				CheckMe()
					.then((res) => {
						dispatch(userUpdate(res.result));
						localStorage.setItem('role', res.result.role);
					})
					.catch((err) => {
						console.log(err);
					});
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
