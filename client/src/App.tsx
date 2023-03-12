import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout, PrivateRoute } from './layout';
import { Chat } from './page/Chat';
import { Login } from './page/Login';
import { Register } from './page/Register';
import { getProfile } from './redux/slices/auth/asyncAuth';
import { useAppDispatch } from './redux/store';

const App = () => {
	const dispatch = useAppDispatch();
	library.add(fas);

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route element={<PrivateRoute />}>
					<Route path="" element={<Chat />} />
				</Route>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
			</Route>
		</Routes>
	);
};

export default App;
