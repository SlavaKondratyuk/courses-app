import { createSlice } from '@reduxjs/toolkit';
import { NameState } from './actionTypes';

const initialState: NameState = {
	name: localStorage.getItem('name') || 'Guest',
	email: localStorage.getItem('email') || '',
	token: localStorage.getItem('token') || '',
	isAuth: localStorage.getItem('isAuth') === 'true' ? true : false,
};

export const userSlice = createSlice({
	name: 'name',
	initialState,
	reducers: {
		nameUpdate: (state, action) => {
			state.name = action.payload;
		},
		emailUpdate: (state, action) => {
			state.email = action.payload;
		},
		tokenUpdate: (state, action) => {
			state.token = action.payload;
		},
		isAuthUpdate: (state, action) => {
			state.isAuth = action.payload;
		},
	},
});

export default userSlice.reducer;
