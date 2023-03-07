import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/auth/slice';
import settings from './slices/settings/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
	reducer: {
		auth,
		settings,
	},
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
