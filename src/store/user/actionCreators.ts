import { userSlice } from './reducer';
import type { RootState } from '../store';

// Action creators are generated for each case reducer function
export const { nameUpdate, emailUpdate, tokenUpdate, isAuthUpdate } =
	userSlice.actions;
export const selectName = (state: RootState) => state.user.name;
export const selectEmail = (state: RootState) => state.user.email;
export const selectToken = (state: RootState) => state.user.token;
export const selectIsAuth = (state: RootState) => state.user.isAuth;
