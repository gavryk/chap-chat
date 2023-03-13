import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const MainLayout: React.FC = () => {
	const { pathname } = useLocation();
	const path = pathname.replace('/', '');
	return (
		<div
			className={`app h-screen bg-gradient-to-br from-black to-[#121286] hide-scrollbar flex items-center`}>
			<div
				className={`mx-auto ${
					path !== 'login' && path !== 'register'
						? 'bg-white bg-opacity-15 min-[1250px]:w-3/4 min-[576px]:w-5/6 min-[320px]:w-11/12 flex h-[94%] my-3 rounded-[15px]'
						: 'xl:container'
				}`}>
				<Outlet />
			</div>
		</div>
	);
};
