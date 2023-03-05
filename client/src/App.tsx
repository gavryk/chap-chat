import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layout';
import { Chat } from './page/Chat';

function App() {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="" element={<Chat />} />
			</Route>
		</Routes>
	);
}

export default App;
