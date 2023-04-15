import { Fragment, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

import Login from './Login/Login';
import Courses from './Courses/Courses';
import Registration from './Registration/Registration';
import CourseForm from './CreateCourse/CourseForm';
// import PageNotFound from './PageNotFound/PageNotFound';
import CourseInfo from './CourseInfo/CourseInfo';
import Header from './Header/Header';

import { fetchCoursesThunk } from '../store/courses/thunk';
import { useAppDispatch } from '../store/hooks';
import { CheckMe } from '../services';
import { appRoutes } from './constants';

function Main() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchCoursesThunk());
		CheckMe().then((res) => {
			console.log(res);
		});
	});

	return (
		<Fragment>
			<Header />
			<Routes>
				<Route path='/' element={<Login />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route path='/registration' element={<Registration />}></Route>
				<Route path='/courses' element={<Courses addCourse={false} />}></Route>
				<Route path='/courses/add' element={<CourseForm />}></Route>
				<Route path='/courses/:courseId' element={<CourseInfo />}></Route>
				<Route path={appRoutes.updateCourse} element={<CourseForm />}></Route>
			</Routes>
		</Fragment>
	);
}

export default Main;
