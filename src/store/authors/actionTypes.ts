import { Author } from '../../components/interfaces/interfaces';

export type AuthorsStateInterface = {
	authors: Author[];
	loading: boolean;
	error: string | undefined;
};
