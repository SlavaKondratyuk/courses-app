import React from 'react';

import './Button.css';

export default function Button(props) {
	const { name } = props;

	function clickHandler() {
		props.clickHandler();
	}

	return (
		<button className='button_main' onClick={clickHandler}>
			{name}
		</button>
	);
}
