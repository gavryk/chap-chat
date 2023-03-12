import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthProps } from '../../common';
import { authSelector } from '../../redux/slices/auth/selector';

export const PrivateRoute: React.FC = () => {
	const [user, setUser] = useState<AuthProps>({} as AuthProps);
	const { auth } = useSelector(authSelector);
	const location = useLocation();

	useEffect(() => {
		setUser(auth as AuthProps);
	}, [auth]);

	return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};
