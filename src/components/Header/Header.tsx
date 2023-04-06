import { Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { nameUpdate } from '../../store/user/actionCreators';

import Logo from './components/Logo/Logo';

import './Header.css';

export default function Header() {
	const name = useAppSelector((state) => state.user.name);
	const dispatch = useAppDispatch();
	function Lagaut() {
		localStorage.removeItem('name');
		localStorage.removeItem('loginToken');
		localStorage.removeItem('email');
		localStorage.removeItem('isAuth');
		dispatch(nameUpdate('Guest'));
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
