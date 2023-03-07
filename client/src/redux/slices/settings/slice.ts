import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { SettingsSliceTypes } from '../../../common';
import { fetchRegister } from '../auth/asyncAuth';

const initialState: SettingsSliceTypes = {
	isLoaded: 'loading',
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
		builder.addMatcher(isAnyOf(fetchRegister.pending), (state) => {
			state.isLoaded = 'loading';
		});
		builder.addMatcher(isAnyOf(fetchRegister.fulfilled), (state, action) => {
			state.isLoaded = 'success';
		});
		builder.addMatcher(isAnyOf(fetchRegister.rejected), (state) => {
			state.isLoaded = 'error';
		});
	},
});

export const { setLoading } = settingsSlice.actions;

export default settingsSlice.reducer;
