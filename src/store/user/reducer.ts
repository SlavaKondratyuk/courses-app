import { createSlice } from '@reduxjs/toolkit';
import { NameState } from './actionTypes';

const initialState: NameState = {
	name: localStorage.getItem('name') ?? 'Guest',
	email: localStorage.getItem('email') ?? '',
	token: localStorage.getItem('loginToken') ?? '',
	isAuth: JSON.parse(localStorage.getItem('isAuth') || 'false'),
	role: localStorage.getItem('role') ?? '',
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
		setRole: (state, action) => {
			state.role = action.payload;
		},
		userUpdate: (state, action) => {
			state.name = action.payload.result.name;
			state.email = action.payload.result.email;
			state.token = action.payload.result.id;
			state.isAuth = true;
			state.role = action.payload.result.role;
		},
	},
});

export default userSlice.reducer;
