import React from 'react';

import Logo from './components/Logo/Logo';
import Button from '../common/Button/Button';

import './Header.css';

function LogData() {
	console.log('Log out');
}

function Header() {
	const name = 'Dave';

	return (
		<div className='header'>
			<div className='logo-wrapper'>
				<Logo />
			</div>
			<div className='button-wrapper'>
				<p>{name}</p>
				<Button name='Logout' clickHandler={LogData} />
			</div>
		</div>
	);
}

export default Header;
