import { createSlice } from '@reduxjs/toolkit';
import { AuthSliceProps } from '../../../common/interfaces/authTypes';
import { fetchRegister } from './asyncAuth';

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
	},
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
