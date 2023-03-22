import { React, useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from './components/Logo/Logo';

import './Header.css';

export default function Header(props) {
	const name = localStorage.getItem('name');

	function Lagaut() {
		localStorage.removeItem('name');
		localStorage.removeItem('loginToken');
	}

	return (
		<div className='header'>
			<div className='logo-wrapper'>
				<Logo />
			</div>
			<div className='button-wrapper'>
				<p>{props.name}</p>
				<Link name='Logout' onClick={Lagaut}>
					Log Out
				</Link>
			</div>
		</div>
	);
}
