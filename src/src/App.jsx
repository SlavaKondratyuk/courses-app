import React from 'react';

import Header from './components/Header/Header';

import './App.css';
import Main from './components/Main';

function App() {
	return (
		<div className='app'>
			<div>
				<Header />
			</div>
			<div>
				<Main />
			</div>
		</div>
	);
}

export default App;
