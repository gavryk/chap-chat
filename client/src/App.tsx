import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layout';
import { Chat } from './page/Chat';
import { Login } from './page/Login';
import { Register } from './page/Register';

const App = () => {
	library.add(fas);
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="" element={<Chat />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
			</Route>
		</Routes>
	);
};

export default App;
