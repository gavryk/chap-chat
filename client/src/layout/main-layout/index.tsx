import React from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = () => {
	return (
		<div className="App">
			<div className="xl:container mx-auto">
				<Outlet />
			</div>
		</div>
	);
};
