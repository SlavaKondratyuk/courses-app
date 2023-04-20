import { Fragment, useEffect } from 'react';

import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Login from './Login/Login';
import Courses from './Courses/Courses';
import Registration from './Registration/Registration';
import CourseForm from './CreateCourse/CourseForm';
// import PageNotFound from './PageNotFound/PageNotFound';
import CourseInfo from './CourseInfo/CourseInfo';
import Header from './Header/Header';

import { fetchCoursesThunk } from '../store/courses/thunk';
import { userUpdate } from '../store/user/actionCreators';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { CheckMe } from '../services';
import { appRoutes } from './constants';

const ProtectedRoute = ({
	role,
	redirectPath = appRoutes.courses,
	children,
}) => {
	if (role !== 'admin') {
		return <Navigate to={redirectPath} replace />;
	}

	return children ? children : <Outlet />;
};

function Main() {
	const dispatch = useAppDispatch();
	const role = useAppSelector((state) => state.user.role);
	useEffect(() => {
		dispatch(fetchCoursesThunk());
	});

	return (
		<Fragment>
			<Header />
			<Routes>
				{/* <Route path={appRoutes.home} element={<Login />}></Route> */}
				<Route index element={<Login />}></Route>
				<Route index path={appRoutes.login} element={<Login />}></Route>
				<Route path={appRoutes.registration} element={<Registration />}></Route>
				<Route
					path={appRoutes.courses}
					element={<Courses addCourse={false} />}
				></Route>
				<Route element={<ProtectedRoute role={role} />}>
					<Route path={appRoutes.updateCourse} element={<CourseForm />}></Route>
					<Route path={appRoutes.addCourse} element={<CourseForm />}></Route>
				</Route>
				<Route path={appRoutes.courseInfo} element={<CourseInfo />}></Route>
			</Routes>
		</Fragment>
	);
}

export default Main;
