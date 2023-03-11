import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Loader } from '../../components';
import { settingsSelector } from '../../redux/slices/settings/selector';

export const MainLayout: React.FC = () => {
	const { isLoaded } = useSelector(settingsSelector);

	return (
		<div
			className={`app h-screen bg-gradient-to-br from-black to-[#121286] hide-scrollbar flex items-center`}>
			{isLoaded === 'loading' && <Loader />}
			<div className="xl:container mx-auto">
				<Outlet />
			</div>
		</div>
	);
};
