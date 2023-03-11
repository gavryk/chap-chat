import { fetchLogin, getProfile, logout } from './../auth/asyncAuth';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { SettingsSliceTypes } from '../../../common';
import { fetchRegister } from '../auth/asyncAuth';

const initialState: SettingsSliceTypes = {
	isLoaded: 'success',
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.isLoaded = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			isAnyOf(fetchRegister.pending, fetchLogin.pending, getProfile.pending, logout.pending),
			(state) => {
				state.isLoaded = 'loading';
			},
		);
		builder.addMatcher(
			isAnyOf(
				fetchRegister.fulfilled,
				fetchLogin.fulfilled,
				getProfile.fulfilled,
				logout.fulfilled,
			),
			(state, action) => {
				state.isLoaded = 'success';
			},
		);
		builder.addMatcher(
			isAnyOf(fetchRegister.rejected, fetchLogin.rejected, getProfile.rejected, logout.rejected),
			(state) => {
				state.isLoaded = 'success';
			},
		);
	},
});

export const { setLoading } = settingsSlice.actions;

export default settingsSlice.reducer;
