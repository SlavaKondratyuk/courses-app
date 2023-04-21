import { Navigate, Outlet } from 'react-router-dom';
import { appRoutes } from '../constants';

export function PrivateRouter({
	role,
	redirectPath = appRoutes.courses,
	children,
}) {
	if (role !== 'admin') {
		return <Navigate to={redirectPath} replace />;
	}

	return children ? children : <Outlet />;
}

export function PrivateLoginRouter({
	redirectPath = appRoutes.courses,
	children,
}) {
	if (!JSON.parse(localStorage.getItem('isAuth'))) {
		return <Navigate to={redirectPath} replace />;
	}

	return children ? children : <Outlet />;
}
