import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Login from './Login/Login';
import Courses from './Courses/Courses';
import Registration from './Registration/Registration';
import CreateCourse from './CreateCourse/CreateCourse';
import PageNotFound from './PageNotFound/PageNotFound';

function Main() {
	return (
		<Routes>
			<Route path='/courses' element={<Courses />}></Route>
			<Route path='/login' element={<Login />}></Route>
			<Route path='/registration' element={<Registration />}></Route>
			<Route path='/courses' element={<Courses />}></Route>
		</Routes>
	);
}

export default Main;
