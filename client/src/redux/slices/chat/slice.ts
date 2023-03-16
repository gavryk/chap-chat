import { createSlice } from '@reduxjs/toolkit';
import uniqBy from 'lodash/uniqBy';
import { ChatSliceProps } from '../../../common/interfaces/chatInterfaces';

const initialState: ChatSliceProps = {
	online: [],
	ws: null,
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setOnlinePeople: (state, action) => {
			const uniqOnline = uniqBy(action.payload, 'userId');
			state.online = uniqOnline as any;
		},
		setWs: (state, action) => {
			state.ws = action.payload;
		},
	},
	extraReducers: (builder) => {},
});

export const { setOnlinePeople, setWs } = chatSlice.actions;

export default chatSlice.reducer;
