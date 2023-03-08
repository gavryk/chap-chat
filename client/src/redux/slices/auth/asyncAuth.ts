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
