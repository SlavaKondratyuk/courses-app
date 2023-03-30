import { Link } from 'react-router-dom';

import Logo from './components/Logo/Logo';

import './Header.css';

export default function Header() {
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
				<p>{name}</p>
				<Link className='link' to='/login' onClick={Lagaut}>
					<span className='span-login'>Log Out</span>
				</Link>
			</div>
		</div>
	);
}
