import { authorsSlice } from './reducer';
import type { RootState } from '../store';

// Action creators are generated for each case reducer function
export const { addNewAuthor, deleteAuthor, initialiseAuthors } =
	authorsSlice.actions;
export const selectAuthors = (state: RootState) => state.authors;
