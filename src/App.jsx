import React from 'react';

import Header from './components/Header/Header';

import './App.css';
import Courses from './components/Courses/Courses';

function App() {
	return (
		<div className='app'>
			<div>
				<Header />
			</div>
			<div>
				<Courses />
			</div>
		</div>
	);
}

export default App;
