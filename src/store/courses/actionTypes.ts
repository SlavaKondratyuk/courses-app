import { CourseInterface } from '../../components/interfaces/interfaces';

export type CourseStateInterface = {
	courses: CourseInterface[];
	loading: boolean;
	loaded: boolean;
	error: string | null;
};
