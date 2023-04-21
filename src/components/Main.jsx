import { Fragment, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

import Login from './Login/Login';
import Courses from './Courses/Courses';
import Registration from './Registration/Registration';
import CourseForm from './CreateCourse/CourseForm';
import CourseInfo from './CourseInfo/CourseInfo';
import Header from './Header/Header';
import {
	PrivateRouter,
	PrivateLoginRouter,
} from './PrivateRouter/PrivateRouter';

import { fetchCoursesThunk } from '../store/courses/thunk';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { appRoutes } from './constants';

function Main() {
	const dispatch = useAppDispatch();
	const role = useAppSelector((state) => state.user.role);
	useEffect(() => {
		dispatch(fetchCoursesThunk());
	}, [dispatch]);

	return (
		<Fragment>
			<Header />
			<Routes>
				<Route index element={<Login />}></Route>
				<Route path={appRoutes.login} element={<Login />}></Route>
				<Route path={appRoutes.registration} element={<Registration />}></Route>
				<Route element={<PrivateLoginRouter />}>
					<Route
						path={appRoutes.courses}
						element={<Courses addCourse={false} />}
					></Route>
					<Route element={<PrivateRouter role={role} />}>
						<Route
							path={appRoutes.updateCourse}
							element={<CourseForm />}
						></Route>
						<Route path={appRoutes.addCourse} element={<CourseForm />}></Route>
					</Route>
					<Route path={appRoutes.courseInfo} element={<CourseInfo />}></Route>
				</Route>
			</Routes>
		</Fragment>
	);
}

export default Main;
