import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layout';
import { Chat } from './page/Chat';
import { Login } from './page/Login';
import { Register } from './page/Register';

const App = () => {
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
