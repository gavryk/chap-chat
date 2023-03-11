import { createSlice } from '@reduxjs/toolkit';
import { AuthSliceProps } from '../../../common/interfaces/authTypes';
import { fetchLogin, fetchRegister, getProfile, logout } from './asyncAuth';

const initialState: AuthSliceProps = {
	auth: null,
	errorString: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchRegister.pending, (state) => {
			state.errorString = '';
		});
		builder.addCase(fetchRegister.fulfilled, (state) => {
			state.errorString = '';
		});
		builder.addCase(fetchRegister.rejected, (state, action) => {
			state.errorString = action.payload;
		});
		builder.addCase(fetchLogin.pending, (state) => {
			state.auth = null;
			state.errorString = '';
		});
		builder.addCase(fetchLogin.fulfilled, (state, action) => {
			state.auth = action.payload as any;
			state.errorString = '';
		});
		builder.addCase(fetchLogin.rejected, (state, action) => {
			state.auth = null;
			state.errorString = action.payload;
		});
		builder.addCase(getProfile.pending, (state) => {
			state.auth = null;
			state.errorString = '';
		});
		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.auth = action.payload;
			state.errorString = '';
		});
		builder.addCase(getProfile.rejected, (state, action) => {
			state.auth = null;
			state.errorString = action.payload;
		});
		builder.addCase(logout.fulfilled, (state, action) => {
			state.auth = null;
			state.errorString = '';
		});
	},
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
