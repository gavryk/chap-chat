import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	auth: null,
	errorString: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
