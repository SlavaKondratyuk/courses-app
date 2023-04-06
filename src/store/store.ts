import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/reducer';
import coursesReducer from './courses/reducer';
import authorsReducer from './authors/reducer';

const store = configureStore({
	reducer: {
		user: userReducer,
		courses: coursesReducer,
		authors: authorsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
