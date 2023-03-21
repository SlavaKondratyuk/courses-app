import React from 'react';

import Banana from '../../../../assets/angryBanana.png';

import './Logo.css';

function Logo() {
	return <img className='logo' src={Banana} alt='logoBanana' />;
}

export default Logo;
