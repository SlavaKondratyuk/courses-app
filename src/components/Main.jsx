import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './Login/Login';
import Courses from './Courses/Courses';
import Registration from './Registration/Registration';
// import CreateCourse from './CreateCourse/CreateCourse';
// import PageNotFound from './PageNotFound/PageNotFound';
import CourseInfo from './CourseInfo/CourseInfo';
import Header from './Header/Header';

function Main() {
	return (
		<Fragment>
			<Header />
			<Routes>
				<Route path='/' element={<Login />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route path='/registration' element={<Registration />}></Route>
				<Route path='/courses' element={<Courses addCourse={false} />}></Route>
				<Route
					path='/courses/add'
					element={<Courses addCourse={true} />}
				></Route>
				<Route path='/courses/:courseId' element={<CourseInfo />}></Route>
			</Routes>
		</Fragment>
	);
}

export default Main;
