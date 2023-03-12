import { redirect } from 'react-router-dom';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../axios';
import { LoginFormValue, RegisterFormValues } from '../../../common';

export const fetchRegister = createAsyncThunk(
	'auth/fetchRegister',
	async (params: RegisterFormValues, { rejectWithValue }) => {
		try {
			const { data } = await axios.post('/auth/register', params);
			return data;
		} catch (err: any) {
			return rejectWithValue(err.response.data.message || err.response.data[0].msg);
		}
	},
);

export const fetchLogin = createAsyncThunk(
	'auth/fetchLogin',
	async (params: LoginFormValue, { rejectWithValue }) => {
		try {
			const { data } = await axios.post('/auth/login', params);
			return data;
		} catch (err: any) {
			console.log(err);
			return rejectWithValue(err.response.data.message || err.response.data[0].msg);
		}
	},
);

export const getProfile = createAsyncThunk(
	'auth/fetchProfile',
	async (params, { rejectWithValue }) => {
		try {
			const { data } = await axios.get('/profile');
			const { iat, ...userData } = data;
			return userData;
		} catch (err: any) {
			return rejectWithValue('');
		}
	},
);
export const logout = createAsyncThunk('auth/logout', async (params, { rejectWithValue }) => {
	try {
		await axios.post('/logout');
	} catch (err: any) {
		return rejectWithValue(err.response.data.message || err.response.data[0].msg);
	}
});
