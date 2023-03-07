import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../axios';
import { RegisterFormValues } from '../../../common';

export const fetchRegister = createAsyncThunk(
	'auth/fetchRegister',
	async (params: RegisterFormValues, { rejectWithValue }) => {
		try {
			const { data } = await axios.post('/auth/register', params);
			return data;
		} catch (err: any) {
			return rejectWithValue(err.response.data[0].msg);
		}
	},
);
