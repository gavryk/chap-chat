import React from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = () => {
	return (
		<div
			className={`app h-screen bg-gradient-to-br from-black to-[#121286] hide-scrollbar flex items-center`}>
			<div className="xl:container mx-auto">
				<Outlet />
			</div>
		</div>
	);
};
