import { createSlice } from '@reduxjs/toolkit';
import { NameState } from './actionTypes';

const initialState: NameState = {
	name: 'Guest',
	email: '',
	token: '',
	isAuth: false,
	role: '',
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
