import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { Loader } from '../../components';
import { settingsSelector } from '../../redux/slices/settings/selector';

export const MainLayout: React.FC = () => {
	const { pathname } = useLocation();
	const { isLoaded } = useSelector(settingsSelector);
	const path = pathname.replace('/', '');

	return (
		<div
			className={`app h-screen bg-gradient-to-br from-black to-[#121286] hide-scrollbar flex items-center`}>
			{isLoaded === 'loading' ? (
				<Loader />
			) : (
				<div className="xl:container mx-auto">
					<Outlet />
				</div>
			)}
		</div>
	);
};
