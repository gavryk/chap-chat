import { createSlice } from '@reduxjs/toolkit';
import uniqBy from 'lodash/uniqBy';
import { ChatSliceProps } from '../../../common/interfaces/chatInterfaces';
import { store } from '../../store';

const initialState: ChatSliceProps = {
	online: [],
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setOnlinePeople: (state, action) => {
			const uniqOnline = uniqBy(action.payload, 'userId');
			state.online = uniqOnline as any;
		},
	},
	extraReducers: (builder) => {},
});

export const { setOnlinePeople } = chatSlice.actions;

export default chatSlice.reducer;
